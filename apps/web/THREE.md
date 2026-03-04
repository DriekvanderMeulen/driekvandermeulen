# Three.js Integration Guide

Complete guide to Three.js 3D scene setup, asset pipeline, physics configuration, and interactive player controls in Kiban.

## Overview

The Kiban web application integrates Three.js for real-time 3D visualization using @react-three/fiber for React integration and @react-three/rapier for physics simulation.

**Key Libraries:**
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Utility helpers (cameras, lighting, loaders)
- **@react-three/rapier**: Physics engine integration (Rapier)
- **@react-three/postprocessing**: Post-processing effects
- **THREE**: Core Three.js library

## Scene Architecture

### Canvas Component

The Three.js scene renders inside a Canvas component from @react-three/fiber:

```tsx
// apps/web/components/office-scene.tsx

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { OfficeEnvironment } from './office-environment'
import { Player } from './player'

export function OfficeScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 75 }}
      style={{ width: '100%', height: '100vh' }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />

      {/* Physics world */}
      <Physics>
        {/* 3D Models and objects */}
        <OfficeEnvironment />
        <Player />
      </Physics>

      {/* Camera controls */}
      <OrbitControls />

      {/* Post-processing */}
      <PostProcessing />
    </Canvas>
  )
}
```

### Key Components

#### Canvas Configuration

```typescript
<Canvas
  camera={{
    position: [0, 5, 10],    // Camera start position
    fov: 75,                 // Field of view
    near: 0.1,               // Near clipping plane
    far: 1000,               // Far clipping plane
  }}
  gl={{
    antialias: true,         // Enable anti-aliasing
    pixelRatio: window.devicePixelRatio,
    preserveDrawingBuffer: false,
  }}
/>
```

#### Lighting Setup

```tsx
// Ambient light for general illumination
<ambientLight intensity={0.6} />

// Directional light (sun-like)
<directionalLight
  position={[10, 20, 10]}
  intensity={0.8}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
/>

// Point light for localized illumination
<pointLight position={[5, 10, 5]} intensity={1} />

// Hemisphere light for natural outdoor lighting
<hemisphereLight
  skyColor={0xffffff}
  groundColor={0x808080}
  intensity={0.6}
/>
```

## GLB Asset Pipeline

### Model Loading

GLB (GLTF binary) models are loaded using `useGLTF` hook from drei:

```tsx
import { useGLTF } from '@react-three/drei'

export function Office() {
  const { scene } = useGLTF('/three/office.glb')
  return <primitive object={scene} />
}
```

### Asset Organization

```
apps/web/public/three/
├── office.glb              # Main environment model
├── logo.glb                # Logo/UI element
└── [other models]/
```

### Git LFS Management

Large GLB files use Git LFS:

```bash
# Track GLB files with LFS
git lfs track "*.glb"

# Add to .gitattributes
echo "*.glb filter=lfs diff=lfs merge=lfs -text" >> .gitattributes

# Commit as normal (LFS handles the rest)
git add office.glb
git commit -m "feat: add office GLB model"
```

**Checking LFS Status:**
```bash
git lfs ls-files
```

### Model Preparation

Best practices for creating GLB models:

1. **Bake Textures**: Pre-bake lighting into textures
2. **Optimize Geometry**: Reduce polygon count
3. **Use LODs**: Create low-poly variants for distance
4. **Combine Meshes**: Merge static geometry
5. **Minimize Materials**: Reuse materials where possible
6. **Compress Textures**: Use compressed formats (KTX2)

### Model Debugging

Access loaded models in the scene:

```tsx
export function OfficeDebug() {
  const { scene } = useGLTF('/three/office.glb')

  useEffect(() => {
    // Log scene structure
    console.log(scene)

    // Find specific mesh
    const mesh = scene.getObjectByName('floor')
    console.log('Floor:', mesh)

    // Access materials
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name, child.material)
      }
    })
  }, [scene])

  return <primitive object={scene} />
}
```

## Physics Configuration

### Rapier Physics World

Physics simulation runs in a separate world:

```tsx
<Physics
  gravity={[0, -9.81, 0]}        // Gravity vector
  timeStep={1 / 60}              // 60 FPS
  colliders="hull"               // Collision shape generation
>
  {/* Physics-enabled objects */}
</Physics>
```

### Rigid Bodies

Objects that participate in physics:

```tsx
import { RigidBody, Collider } from '@react-three/rapier'

export function Player() {
  return (
    <RigidBody
      position={[0, 2, 0]}
      linearVelocity={[0, 0, 0]}
      type="dynamic"             // dynamic, fixed, or kinematic
      friction={0.7}
    >
      <Collider shape="capsule" args={[0.5, 1.0]} />
      <mesh>
        <capsuleGeometry args={[0.5, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  )
}
```

### Collision Detection

Detect collisions between objects:

```tsx
import { useCollider } from '@react-three/rapier'

export function ZoneTrigger({ zoneName, onEnter, onExit }) {
  const colliderRef = useRef()

  useEffect(() => {
    const collider = colliderRef.current
    if (!collider) return

    const unsubscribe = collider.onIntersectionEnter(({ other }) => {
      if (other.isSensor) {
        onEnter(zoneName)
      }
    })

    return unsubscribe
  }, [zoneName, onEnter])

  return (
    <RigidBody type="fixed" ref={colliderRef}>
      <Collider shape="cuboid" args={[5, 5, 5]} sensor />
      {/* Invisible trigger volume */}
    </RigidBody>
  )
}
```

### Sensor Colliders

Non-physical collision volumes for triggers:

```tsx
<RigidBody type="fixed">
  <Collider
    shape="cuboid"
    args={[10, 10, 10]}
    sensor               // Doesn't collide physically
    onIntersectionEnter={(other) => {
      console.log('Entered zone')
    }}
  />
</RigidBody>
```

## Player Movement and Controls

### Keyboard Input

```tsx
import { useEffect, useRef } from 'react'

export function Player() {
  const bodyRef = useRef()
  const keysPressed = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    if (!bodyRef.current) return

    const speed = 10
    const velocity = [0, 0, 0]

    if (keysPressed.current['w']) velocity[2] -= speed
    if (keysPressed.current['s']) velocity[2] += speed
    if (keysPressed.current['a']) velocity[0] -= speed
    if (keysPressed.current['d']) velocity[0] += speed

    bodyRef.current.setLinearVelocity({
      x: velocity[0],
      y: bodyRef.current.linvel().y,
      z: velocity[2],
    })
  })

  return (
    <RigidBody ref={bodyRef} position={[0, 2, 0]} type="dynamic">
      <mesh>
        <capsuleGeometry />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  )
}
```

### Camera Following Player

```tsx
import { useFrame, useThree } from '@react-three/fiber'

export function CameraFollower({ playerRef }) {
  const { camera } = useThree()
  const offset = useRef([0, 5, 10])

  useFrame(() => {
    if (!playerRef.current) return

    const playerPos = playerRef.current.translation()
    camera.position.lerp(
      new THREE.Vector3(
        playerPos.x + offset.current[0],
        playerPos.y + offset.current[1],
        playerPos.z + offset.current[2]
      ),
      0.1  // Smoothing factor
    )
    camera.lookAt(playerPos.x, playerPos.y, playerPos.z)
  })

  return null
}
```

## Interactive Zones

### Zone Detection

```tsx
import { useZoneInteraction } from '@/hooks/use-zone-interaction'

export function OfficeScene() {
  const { displayedZone, handleZoneEnter } = useZoneInteraction()

  return (
    <Canvas>
      <Physics>
        {/* Zone trigger volumes */}
        {zones.map((zone) => (
          <ZoneTrigger
            key={zone.id}
            zoneName={zone.id}
            position={zone.position}
            onEnter={() => handleZoneEnter(zone.id)}
          />
        ))}

        <Player />
      </Physics>

      {/* Display zone content */}
      {displayedZone && (
        <ZoneContent content={displayedZone.content} />
      )}
    </Canvas>
  )
}
```

### Zone Trigger Implementation

```tsx
function ZoneTrigger({ zoneName, position, onEnter }) {
  const triggerRef = useRef()

  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const unsub = trigger.onIntersectionEnter(() => onEnter())
    return unsub
  }, [zoneName, onEnter])

  return (
    <RigidBody position={position} type="fixed" ref={triggerRef}>
      <Collider shape="cuboid" args={[3, 3, 3]} sensor />
    </RigidBody>
  )
}
```

## Post-Processing Effects

### Effect Composer

```tsx
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom intensity={0.6} luminanceThreshold={0.9} />
      <ToneMapping exposure={1.2} />
    </EffectComposer>
  )
}
```

### Common Effects

- **Bloom**: Glow effect for bright areas
- **Vignette**: Darkening at screen edges
- **Grain**: Film grain texture
- **ChromaticAberration**: RGB channel separation
- **DepthOfField**: Camera focus blur
- **SSAO**: Screen-space ambient occlusion

## Performance Optimization

### LOD (Level of Detail)

Use simpler models at distance:

```tsx
import { useDepthBuffer } from '@react-three/drei'

export function OptimizedModel({ url }) {
  const { scene: detailed } = useGLTF(url)
  const { scene: lowPoly } = useGLTF(url + '-lowpoly')

  return (
    <LOD>
      <LODLevel screenCover={1} geometry={detailed} />
      <LODLevel screenCover={0.5} geometry={lowPoly} />
    </LOD>
  )
}
```

### Frustum Culling

Three.js automatically hides objects outside camera view.

### Instancing

For multiple identical objects:

```tsx
import { Instances, Instance } from '@react-three/drei'

export function Trees() {
  return (
    <Instances limit={1000} range={1000}>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      {treePositions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  )
}
```

## Debugging

### Visual Helpers

```tsx
import { GridHelper, AxesHelper, CameraHelper } from 'three'
import { useHelper } from '@react-three/drei'

export function DebugScene() {
  const cameraRef = useRef()
  useHelper(cameraRef, CameraHelper)

  return (
    <>
      <gridHelper args={[100, 100]} />
      <axesHelper args={[50]} />
      <perspectiveCamera ref={cameraRef} />
    </>
  )
}
```

### Rapier Debug Mode

```tsx
<Physics debug>
  {/* Shows collision shapes and physics bodies */}
</Physics>
```

## Performance Metrics

Monitor performance:

```tsx
import { Perf } from 'r3f-perf'

<Canvas>
  <Perf position="top-left" />
  {/* Scene content */}
</Canvas>
```

## Common Issues

### Models not Loading

- Check file path is correct
- Verify Git LFS is installed and tracking .glb files
- Check browser console for CORS or loading errors
- Use Drizzle Studio or network tab to debug

### Physics Not Working

- Ensure Rapier is initialized
- Check RigidBody `type` prop (dynamic/fixed/kinematic)
- Verify Collider shapes match geometry
- Debug with `<Physics debug>`

### Poor Performance

- Reduce polygon count in models
- Use LOD for distant objects
- Disable post-processing effects
- Check frame rate with Perf monitor

## Related Documentation

- `ARCHITECTURE.md` - System design
- `ANIMATIONS.md` - Animation patterns
- `CONTENT.md` - Zone interaction data
- Three.js: https://threejs.org/docs/
- @react-three/fiber: https://docs.pmnd.rs/react-three-fiber/
- Rapier Physics: https://rapier.rs/docs/
