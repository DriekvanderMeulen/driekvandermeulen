'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, useGLTF, Preload } from '@react-three/drei'
import {
	Physics,
	RigidBody,
	CapsuleCollider,
	CuboidCollider,
	RapierRigidBody,
} from '@react-three/rapier'
import { Suspense, useRef, useEffect, useState, useCallback, memo } from 'react'
import type { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import * as THREE from 'three'

// Constants
const WALK_SPEED = 2
const JUMP_FORCE = 4
const PLAYER_HEIGHT = 1.6
const CAMERA_HEIGHT = 3
const START_POSITION: [number, number, number] = [0.1, 0, 6.39]

// Reusable Vector3 instances (avoid allocations in render loop)
const _direction = new THREE.Vector3()
const _frontVector = new THREE.Vector3()
const _sideVector = new THREE.Vector3()

// Office model with trimesh collider (more robust for static scenes)
const OfficeModel = memo(function OfficeModel() {
	const { scene } = useGLTF('/three/office.glb')

	// Optimize loaded model and enable shadows
	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.frustumCulled = true
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	}, [scene])

	return (
		<RigidBody type="fixed" colliders="trimesh">
			<primitive object={scene} />
		</RigidBody>
	)
})

useGLTF.preload('/three/office.glb')

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
		camera.position.set(START_POSITION[0], CAMERA_HEIGHT, START_POSITION[2])
		camera.rotation.set(0.01, 0.02, 0)
	}, [camera])

	useFrame(() => {
		const body = rigidBodyRef.current
		if (!body) return

		const velocity = body.linvel()
		const position = body.translation()
		const keyState = keys.current

		// Update camera position (only x/z, y is fixed)
		camera.position.x = position.x
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

function ClickToStart() {
	const [started, setStarted] = useState(false)

	const handleClick = useCallback(() => setStarted(true), [])

	if (started) return null

	return (
		<div
			onClick={handleClick}
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
				<p style={{ marginBottom: '0.5rem' }}>Click to start</p>
				<p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
					WASD to move • Mouse to look • Space to jump • Esc to exit
				</p>
			</div>
		</div>
	)
}

export default function OfficeScene() {
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
			}}
		>
			<ClickToStart />
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
				dpr={[1, 2]} // Caps pixel ratio at 2 (equivalent to setPixelRatio)
				performance={{ min: 0.5 }} // Allow frame drops to 30fps under load
				flat // Disables tone mapping (slight perf gain)
			>
				<Physics gravity={[0, -9.81, 0]}>
					<Scene />
				</Physics>
			</Canvas>
		</div>
	)
}
