'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, useGLTF, Preload, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
	Physics,
	RigidBody,
	CapsuleCollider,
	CuboidCollider,
	TrimeshCollider,
	RapierRigidBody,
} from '@react-three/rapier'
import { Suspense, useRef, useEffect, useState, useCallback, memo } from 'react'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import * as THREE from 'three'

// Constants
const WALK_SPEED = 4.5
const JUMP_FORCE = 3
const PLAYER_HEIGHT = 1.6
const CAMERA_EYE_HEIGHT = 2.625 // Offset from player position
const START_POSITION: [number, number, number] = [0.1, 0, 6.39]

// Reusable Vector3 instances (avoid allocations in render loop)
const _direction = new THREE.Vector3()
const _frontVector = new THREE.Vector3()
const _sideVector = new THREE.Vector3()

// Collision mesh data structure
interface CollisionMeshData {
	name: string
	vertices: Float32Array
	indices: Uint32Array
	position: THREE.Vector3
	rotation: THREE.Euler
	scale: THREE.Vector3
}

// Office model with visual processing  
const OfficeModel = memo(function OfficeModel() {
	const [scene, setScene] = useState<THREE.Group | null>(null)
	const [collisionMeshes, setCollisionMeshes] = useState<Array<CollisionMeshData>>([])
	const hasLoggedRef = useRef(false)

	useEffect(() => {
		const loader = new GLTFLoader()
		
		loader.load(
			'/three/office.glb',
			(gltf) => {
				setScene(gltf.scene)
			},
			undefined,
			(error) => {
				console.error('Failed to load GLB. The file may have texture reference issues:', error)
				console.error('Error details:', error.message, error.stack)
			}
		)
	}, [])

	// Process scene and extract collision meshes
	useEffect(() => {
		if (!scene) return

		const colliders: Array<CollisionMeshData> = []
		const colliderNames: Array<string> = []
		const lightNames: Array<string> = []

		scene.traverse((child) => {
			// Enable lights from Blender
			if (child instanceof THREE.Light) {
				child.visible = true
				// Enable shadows for directional and spot lights
				if (child instanceof THREE.DirectionalLight || child instanceof THREE.SpotLight) {
					child.castShadow = true
					// Set shadow map size if not already set
					if (!child.shadow.mapSize) {
						child.shadow.mapSize.width = 2048
						child.shadow.mapSize.height = 2048
					}
				}
				lightNames.push(child.name || child.type)
			}

			if (child instanceof THREE.Mesh) {
				const isCollider = child.name.startsWith('col_')

				if (isCollider) {
					// Hide collision objects from view
					child.visible = false
					child.castShadow = false
					child.receiveShadow = false

					// Extract geometry data for physics
					const geometry = child.geometry
					if (geometry) {
						// Get world transform
						child.updateWorldMatrix(true, false)
						const worldPosition = new THREE.Vector3()
						const worldRotation = new THREE.Euler()
						const worldScale = new THREE.Vector3()
						const worldQuaternion = new THREE.Quaternion()

						child.getWorldPosition(worldPosition)
						child.getWorldQuaternion(worldQuaternion)
						worldRotation.setFromQuaternion(worldQuaternion)
						child.getWorldScale(worldScale)

						// Clone geometry and apply world transform to vertices
						const clonedGeometry = geometry.clone()
						clonedGeometry.applyMatrix4(child.matrixWorld)

						const positionAttr = clonedGeometry.getAttribute('position')
						const vertices = new Float32Array(positionAttr.array)

						// Get or generate indices
						let indices: Uint32Array
						if (clonedGeometry.index) {
							indices = new Uint32Array(clonedGeometry.index.array)
						} else {
							// Generate indices for non-indexed geometry
							const numVertices = positionAttr.count
							indices = new Uint32Array(numVertices)
							for (let i = 0; i < numVertices; i++) {
								indices[i] = i
							}
						}

						colliders.push({
							name: child.name,
							vertices,
							indices,
							position: new THREE.Vector3(0, 0, 0), // Already baked into vertices
							rotation: new THREE.Euler(0, 0, 0),
							scale: new THREE.Vector3(1, 1, 1),
						})
						colliderNames.push(child.name)
					}
				} else {
					// Visible objects: render normally
					child.frustumCulled = true
					child.castShadow = true
					child.receiveShadow = true
				}
			}
		})

		// Log collision objects and lights once
		if (!hasLoggedRef.current) {
			if (colliderNames.length > 0) {
				console.log('=== COLLISION OBJECTS FOUND ===')
				console.log(`Total: ${colliderNames.length} collision meshes`)
				console.log('Names:')
				colliderNames.forEach((name, index) => {
					console.log(`  ${index + 1}. ${name}`)
				})
				console.log('===============================')
			}
			
			if (lightNames.length > 0) {
				console.log('=== LIGHTS FOUND ===')
				console.log(`Total: ${lightNames.length} lights`)
				console.log('Names:')
				lightNames.forEach((name, index) => {
					console.log(`  ${index + 1}. ${name}`)
				})
				console.log('===================')
			}
			
			hasLoggedRef.current = true
		}

		setCollisionMeshes(colliders)
	}, [scene])

	if (!scene) return null

	return (
		<>
			<primitive object={scene} />
			{/* Render collision bodies */}
			{collisionMeshes.map((meshData) => (
				<RigidBody
					key={meshData.name}
					type="fixed"
					colliders={false}
					position={[meshData.position.x, meshData.position.y, meshData.position.z]}
				>
					<TrimeshCollider args={[meshData.vertices, meshData.indices]} />
				</RigidBody>
			))}
		</>
	)
})

// useGLTF.preload('/three/office.glb') // Disabled to prevent redundant loading of 454MB file before cache check

// Keyboard state using refs (no re-renders on key press)
interface KeyStateRef {
	forward: boolean
	backward: boolean
	left: boolean
	right: boolean
	jump: boolean
}

function useKeyboardControls(): React.RefObject<KeyStateRef> {
	const keys = useRef<KeyStateRef>({
		forward: false,
		backward: false,
		left: false,
		right: false,
		jump: false,
	})

	useEffect(() => {
		const keyMap: Record<string, keyof KeyStateRef> = {
			KeyW: 'forward',
			ArrowUp: 'forward',
			KeyS: 'backward',
			ArrowDown: 'backward',
			KeyA: 'left',
			ArrowLeft: 'left',
			KeyD: 'right',
			ArrowRight: 'right',
			Space: 'jump',
		}

		function handleKeyDown(event: KeyboardEvent) {
			const key = keyMap[event.code]
			if (key) keys.current[key] = true
		}

		function handleKeyUp(event: KeyboardEvent) {
			const key = keyMap[event.code]
			if (key) keys.current[key] = false
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	return keys
}

function Player() {
	const rigidBodyRef = useRef<RapierRigidBody>(null)
	const controlsRef = useRef<PointerLockControlsImpl>(null)
	const { camera } = useThree()
	const keys = useKeyboardControls()
	const canJumpRef = useRef(true)

	// Set initial camera position and rotation
	useEffect(() => {
		camera.position.set(
			START_POSITION[0],
			START_POSITION[1] + CAMERA_EYE_HEIGHT,
			START_POSITION[2]
		)
		camera.rotation.set(0.01, 0.02, 0)
	}, [camera])

	useFrame(() => {
		const body = rigidBodyRef.current
		if (!body) return

		const velocity = body.linvel()
		const position = body.translation()
		const keyState = keys.current

		// Update camera position to follow player (including jump)
		camera.position.x = position.x
		camera.position.y = position.y + CAMERA_EYE_HEIGHT
		camera.position.z = position.z

		// Calculate movement direction
		_frontVector.set(0, 0, Number(keyState.backward) - Number(keyState.forward))
		_sideVector.set(Number(keyState.left) - Number(keyState.right), 0, 0)

		_direction
			.subVectors(_frontVector, _sideVector)
			.normalize()
			.multiplyScalar(WALK_SPEED)
			.applyEuler(camera.rotation)

		// Apply horizontal movement, preserve vertical velocity
		body.setLinvel({ x: _direction.x, y: velocity.y, z: _direction.z }, true)

		// Ground check and jumping
		const isGrounded = Math.abs(velocity.y) < 0.1

		if (keyState.jump && isGrounded && canJumpRef.current) {
			body.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true)
			canJumpRef.current = false
		}

		if (!keyState.jump) {
			canJumpRef.current = true
		}
	})

	return (
		<>
			<RigidBody
				ref={rigidBodyRef}
				position={START_POSITION}
				enabledRotations={[false, false, false]}
				linearDamping={0.5}
				mass={1}
			>
				<CapsuleCollider args={[PLAYER_HEIGHT / 2 - 0.25, 0.25]} />
			</RigidBody>
			<PointerLockControls ref={controlsRef} />
		</>
	)
}

// Memoized floor (never changes)
const Floor = memo(function Floor() {
	return (
		<RigidBody type="fixed" position={[0, -0.1, 0]}>
			<CuboidCollider args={[500, 0.1, 500]} />
		</RigidBody>
	)
})

// Optimized lighting: HemisphereLight + single DirectionalLight
// Replaces: ambient + 2 directional + 1 point = 4 lights → 2 lights
const Lighting = memo(function Lighting() {
	return (
		<>
			{/* HemisphereLight: cheap ambient + ground bounce simulation */}
			<hemisphereLight
				args={['#ffb84d', '#8b7355', 0.6]} // sky, ground, intensity
			/>
			{/* Single directional for main sun with shadows */}
			<directionalLight
				position={[10, 15, -10]}
				intensity={1.0}
				color="#ffb84d"
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-camera-left={-20}
				shadow-camera-right={20}
				shadow-camera-top={20}
				shadow-camera-bottom={-20}
			/>
		</>
	)
})

function Scene() {
	return (
		<>
			<Lighting />
			<Floor />
			<Suspense fallback={null}>
				<OfficeModel />
			</Suspense>
			<Player />
			<Preload all />
		</>
	)
}

function LoadingScreen() {
	const { progress } = useProgress()
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#000',
				color: 'white',
				zIndex: 20,
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<div style={{ width: '200px', height: '2px', background: '#333', marginBottom: '1rem' }}>
				<div
					style={{
						width: `${progress}%`,
						height: '100%',
						background: 'white',
						transition: 'width 0.3s ease-out',
					}}
				/>
			</div>
			<p style={{ fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
				Loading {Math.round(progress)}%
			</p>
		</div>
	)
}

function ClickToStart({ onStart }: { onStart: () => void }) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				onStart()
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onStart])

	return (
		<div
			onClick={onStart}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(0, 0, 0, 0.7)',
				color: 'white',
				fontSize: '1.5rem',
				fontFamily: 'system-ui, sans-serif',
				cursor: 'pointer',
				zIndex: 10,
			}}
		>
			<div style={{ textAlign: 'center' }}>
				<p style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
					Office Ready
				</p>
				<p style={{ marginBottom: '0.5rem' }}>Press ENTER or CLICK to enter</p>
				<p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
					WASD to move • Mouse to look • Space to jump • Esc to exit
				</p>
			</div>
		</div>
	)
}

export default function OfficeScene() {
	const [started, setStarted] = useState(false)
	const { progress, active } = useProgress()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (!active && progress === 100) {
			// Small delay to ensure smooth transition
			const timer = setTimeout(() => setIsLoaded(true), 500)
			return () => clearTimeout(timer)
		}
	}, [active, progress])

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				margin: 0,
				padding: 0,
				overflow: 'hidden',
				background: '#000',
			}}
		>
			{!isLoaded ? (
				<LoadingScreen />
			) : !started ? (
				<ClickToStart onStart={() => setStarted(true)} />
			) : null}

			<Canvas
				shadows
				style={{
					width: '100vw',
					height: '100vh',
					display: 'block',
				}}
				gl={{
					antialias: true,
					powerPreference: 'high-performance',
					stencil: false,
					depth: true,
				}}
				dpr={[1, 2]}
				performance={{ min: 0.5 }}
				flat
			>
				<Physics gravity={[0, -9.81, 0]}>
					<Scene />
				</Physics>
			</Canvas>
		</div>
	)
}
