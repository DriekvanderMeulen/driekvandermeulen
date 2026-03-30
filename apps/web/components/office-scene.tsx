'use client'

/* eslint-disable react/no-unknown-property */
import { PointerLockControls, Preload, useProgress } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import {
	CapsuleCollider,
	CuboidCollider,
	Physics,
	RapierRigidBody,
	RigidBody,
	TrimeshCollider,
} from '@react-three/rapier'
import {
	Suspense,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import * as THREE from 'three'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { ZoneDetailPanel } from '@/components/zone-detail-panel'
import { useZoneInteraction } from '@/hooks/use-zone-interaction'

// GLB asset URL: uses Vercel Blob CDN in production, local file in development
const GLB_URL = process.env.NEXT_PUBLIC_GLB_URL || '/three/office.glb'

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

// Context for trigger zone data
const TriggerZoneContext = createContext<{
	setTriggerZones: (zones: Array<TriggerZoneData>) => void
} | null>(null)

// Collision mesh data structure
interface CollisionMeshData {
	name: string
	vertices: Float32Array
	indices: Uint32Array
	position: THREE.Vector3
	rotation: THREE.Euler
	scale: THREE.Vector3
}

// Trigger zone data structure
interface TriggerZoneData {
	name: string
	boundingBox: THREE.Box3
	center: THREE.Vector3
	size: THREE.Vector3
}

// Office model with visual processing
const OfficeModel = memo(function OfficeModel() {
	const [scene, setScene] = useState<THREE.Group | null>(null)
	const [collisionMeshes, setCollisionMeshes] = useState<
		Array<CollisionMeshData>
	>([])
	const hasLoggedRef = useRef(false)
	const context = useContext(TriggerZoneContext)

	useEffect(() => {
		const loader = new GLTFLoader()

		loader.load(
			GLB_URL,
			(gltf) => {
				setScene(gltf.scene)
			},
			undefined,
			(error) => {
				console.error(
					'Failed to load GLB. The file may have texture reference issues:',
					error,
				)
				if (error instanceof Error) {
					console.error('Error details:', error.message, error.stack)
				}
			},
		)
	}, [])

	// Process scene and extract collision meshes
	useEffect(() => {
		if (!scene) return

		const colliders: Array<CollisionMeshData> = []
		const colliderNames: Array<string> = []
		const triggers: Array<TriggerZoneData> = []
		const triggerNames: Array<string> = []
		const lightNames: Array<string> = []

		scene.traverse((child) => {
			// Enable lights from Blender
			if (child instanceof THREE.Light) {
				child.visible = true
				// Enable shadows for directional and spot lights
				if (
					child instanceof THREE.DirectionalLight ||
					child instanceof THREE.SpotLight
				) {
					child.castShadow = true
					// Set shadow map size if not already set
					if (!child.shadow.mapSize.width) {
						child.shadow.mapSize.width = 2048
						child.shadow.mapSize.height = 2048
					}
				}
				lightNames.push(child.name || child.type)
			}

			if (child instanceof THREE.Mesh) {
				const isCollider = child.name.startsWith('col_')
				const isTrigger = child.name.startsWith('range_')

				if (isTrigger) {
					// Hide trigger zones (invisible, no shadows, no light interaction)
					child.visible = false
					child.castShadow = false
					child.receiveShadow = false

					// Compute world-space bounding box
					child.updateWorldMatrix(true, false)
					const geometry = child.geometry

					if (geometry) {
						// Clone geometry and apply world transform
						const clonedGeometry = geometry.clone()
						clonedGeometry.applyMatrix4(child.matrixWorld)

						// Compute bounding box in world space
						clonedGeometry.computeBoundingBox()
						const bbox = clonedGeometry.boundingBox

						if (bbox) {
							const worldBox = new THREE.Box3(
								bbox.min.clone(),
								bbox.max.clone(),
							)

							triggers.push({
								name: child.name,
								boundingBox: worldBox,
								center: worldBox.getCenter(new THREE.Vector3()),
								size: worldBox.getSize(new THREE.Vector3()),
							})
							triggerNames.push(child.name)
						}
					}
				}

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

			if (triggerNames.length > 0) {
				console.log('=== TRIGGER ZONES FOUND ===')
				console.log(`Total: ${triggerNames.length} trigger zones`)
				console.log('Names:')
				triggerNames.forEach((name, index) => {
					console.log(`  ${index + 1}. ${name}`)
				})
				console.log('===========================')
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
		context?.setTriggerZones(triggers)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					position={[
						meshData.position.x,
						meshData.position.y,
						meshData.position.z,
					]}
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

function useKeyboardControls(): React.MutableRefObject<KeyStateRef> {
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
			START_POSITION[2],
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

		// Debug: Log movement calculation when keys are active
		if (
			keyState.forward ||
			keyState.backward ||
			keyState.left ||
			keyState.right
		) {
			console.log('[DEBUG] Direction calculated:', {
				frontVector: {
					x: _frontVector.x,
					y: _frontVector.y,
					z: _frontVector.z,
				},
				sideVector: { x: _sideVector.x, y: _sideVector.y, z: _sideVector.z },
				direction: { x: _direction.x, y: _direction.y, z: _direction.z },
				position: { x: position.x, y: position.y, z: position.z },
			})
		}

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

// Trigger zone detector component
interface TriggerZoneDetectorProps {
	zones: Array<TriggerZoneData>
	onEnter?: (zoneName: string) => void
	onExit?: (zoneName: string) => void
}

function TriggerZoneDetector({
	zones,
	onEnter,
	onExit,
}: TriggerZoneDetectorProps) {
	const { camera } = useThree()
	const activeZonesRef = useRef<Set<string>>(new Set())

	useFrame(() => {
		if (zones.length === 0) return

		const cameraPos = camera.position
		const currentlyActive = new Set<string>()

		// Check each zone
		for (const zone of zones) {
			if (zone.boundingBox.containsPoint(cameraPos)) {
				currentlyActive.add(zone.name)

				// Check if this is a NEW entry (wasn't active before)
				if (!activeZonesRef.current.has(zone.name)) {
					console.log(`Entered zone: ${zone.name}`)
					onEnter?.(zone.name)
				}
			}
		}

		// Check for exits (was active, but no longer)
		for (const previousZone of activeZonesRef.current) {
			if (!currentlyActive.has(previousZone)) {
				console.log(`Exited zone: ${previousZone}`)
				onExit?.(previousZone)
			}
		}

		// Update active set for next frame
		activeZonesRef.current = currentlyActive
	})

	return null
}

// Memoized floor (never changes)
const Floor = memo(function Floor() {
	return (
		<RigidBody type="fixed" position={[0, -0.1, 0]}>
			<CuboidCollider args={[500, 0.1, 500]} />
		</RigidBody>
	)
})

// Reusable Physical Bulb Component
function PhysicalBulb({
	position,
	color,
	intensity,
}: {
	position: [number, number, number]
	color: string
	intensity: number
}) {
	return (
		<group position={position}>
			<mesh>
				<sphereGeometry args={[0.2, 32, 32]} />
				<meshStandardMaterial
					emissive={color}
					emissiveIntensity={15} // High emissive intensity for bloom
					color="#000000"
					toneMapped={false}
				/>
			</mesh>
			<pointLight
				color={color}
				intensity={intensity}
				decay={2}
				distance={20}
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={-0.0005}
				shadow-normalBias={0.1}
			/>
		</group>
	)
}

// Optimized lighting: HemisphereLight + single DirectionalLight
// Replaces: ambient + 2 directional + 1 point = 4 lights → 2 lights
const Lighting = memo(function Lighting() {
	return (
		<>
			{/* HemisphereLight: cheap ambient + ground bounce simulation */}
			<hemisphereLight
				args={['#ffb84d', '#8b7355', 0.2]} // Lowered intensity to let bulbs shine
			/>
			{/* Single directional for main sun with shadows */}
			<directionalLight
				position={[10, 15, -10]}
				intensity={0.5} // Lowered intensity
				color="#ffb84d"
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-bias={-0.0005}
				shadow-normalBias={0.1}
				shadow-camera-left={-20}
				shadow-camera-right={20}
				shadow-camera-top={20}
				shadow-camera-bottom={-20}
			/>

			{/* Central axis lighting */}
			<PhysicalBulb position={[0, 5, 5.5]} color="#FFD6AA" intensity={15} />
			<PhysicalBulb position={[0, 5, 0]} color="#FFD6AA" intensity={15} />
			<PhysicalBulb position={[0, 5, -14]} color="#FFD6AA" intensity={15} />
		</>
	)
})

interface CameraPositionReporterProps {
	onUpdate: (pos: { x: number; y: number; z: number }) => void
}

function CameraPositionReporter({ onUpdate }: CameraPositionReporterProps) {
	const { camera } = useThree()
	useFrame(() => {
		onUpdate({
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z,
		})
	})
	return null
}

function Scene({
	onCameraPosUpdate,
	onZoneEnter,
	onZoneExit,
}: {
	onCameraPosUpdate?: (pos: { x: number; y: number; z: number }) => void
	onZoneEnter?: (zoneName: string) => void
	onZoneExit?: (zoneName: string) => void
}) {
	const [triggerZones, setTriggerZones] = useState<Array<TriggerZoneData>>([])

	const contextValue = useMemo(() => ({ setTriggerZones }), [setTriggerZones])

	return (
		<TriggerZoneContext.Provider value={contextValue}>
			{onCameraPosUpdate ? (
				<CameraPositionReporter onUpdate={onCameraPosUpdate} />
			) : null}
			<Lighting />
			<Floor />
			<Suspense fallback={null}>
				<OfficeModel />
			</Suspense>
			<Player />
			{triggerZones.length > 0 ? (
				<TriggerZoneDetector
					zones={triggerZones}
					onEnter={onZoneEnter}
					onExit={onZoneExit}
				/>
			) : null}
			<Preload all />
		</TriggerZoneContext.Provider>
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
			<div
				style={{
					width: '200px',
					height: '2px',
					background: '#333',
					marginBottom: '1rem',
				}}
			>
				<div
					style={{
						width: `${progress}%`,
						height: '100%',
						background: 'white',
						transition: 'width 0.3s ease-out',
					}}
				/>
			</div>
			<p
				style={{
					fontSize: '0.875rem',
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
				}}
			>
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
				<p
					style={{
						marginBottom: '1.5rem',
						fontSize: '2rem',
						fontWeight: 'bold',
					}}
				>
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
	const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 })
	const { progress, active } = useProgress()
	const [isLoaded, setIsLoaded] = useState(false)

	const { displayedZone, handleZoneEnter, handleZoneExit } =
		useZoneInteraction()

	useEffect(() => {
		if (!active && progress === 100) {
			// Small delay to ensure smooth transition
			const timer = setTimeout(() => setIsLoaded(true), 500)
			return () => clearTimeout(timer)
		}
	}, [active, progress])

	// Console log camera position every 5 seconds
	useEffect(() => {
		if (!started) return

		const interval = setInterval(() => {
			console.log(
				`Camera position: x ${cameraPos.x.toFixed(2)} y ${cameraPos.y.toFixed(2)} z ${cameraPos.z.toFixed(2)}`,
			)
		}, 5000)

		return () => clearInterval(interval)
	}, [started, cameraPos])

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
					<Scene
						onCameraPosUpdate={setCameraPos}
						onZoneEnter={handleZoneEnter}
						onZoneExit={handleZoneExit}
					/>
				</Physics>
				<EffectComposer>
					<Bloom
						luminanceThreshold={1.0}
						luminanceSmoothing={0.025}
						intensity={1.5}
					/>
				</EffectComposer>
			</Canvas>

			{started ? <ZoneDetailPanel zone={displayedZone} /> : null}
		</div>
	)
}
