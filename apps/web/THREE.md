# Three.js Integration Guide

Complete guide to the Three.js 3D scene system in the Kiban web application, including scene setup, asset pipeline, physics configuration, and player controls.

## Overview

The application uses Three.js for rendering interactive 3D environments with physics simulation and player interaction. Key technologies:

- **React Three Fiber** - Component-based Three.js wrapper
- **Drei** - Utility components for common 3D tasks
- **Rapier** - Physics engine for collision detection and movement
- **Postprocessing** - Visual effects (depth of field, bloom, etc.)
- **GLB Assets** - 3D models stored via Git LFS

## Architecture

### Scene Structure

The main 3D scene is defined in `components/office-scene.tsx`:

```
Canvas (React Three Fiber)
├── Lighting
│   ├── Ambient Light
│   └── Directional Light
├── Physics World (Rapier)
│   ├── Static Colliders (Floor, Walls)
│   ├── Dynamic Colliders (Player)
│   └── Trigger Zones (Interaction Areas)
├── 3D Models
│   ├── Office GLB Model
│   └── Other Static Assets
├── Camera Controller
│   └── First-Person View
├── Postprocessing Effects
│   └── DepthOfField, Bloom, etc.
└── Shadows
    └── Shadow Maps
```

### Component Layout

- **Canvas Setup** - `components/office-scene.tsx` main scene component
- **Physics World** - Rapier integration for collision and movement
- **Player Controller** - First-person camera and movement logic
- **Asset Loading** - GLB model loader with error handling
- **Interaction Zones** - Trigger-based zone detection

## Setting Up the Scene

### Basic Canvas Configuration

```typescript
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

export function OfficeScene() {
  return (
    <Canvas
      camera={{
        position: [0, 1.7, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      shadows
    >
      <Physics gravity={[0, -9.81, 0]}>
        {/* Scene content */}
      </Physics>
    </Canvas>
  );
}
```

**Canvas Props:**
- `camera` - Camera position, FOV, and clipping planes
- `shadows` - Enable shadow rendering
- `gl` - WebGL renderer configuration
- `onCreated` - Callback after Three.js scene creation

### Lighting

```typescript
<ambientLight intensity={0.6} />
<directionalLight
  position={[10, 10, 5]}
  intensity={0.8}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
/>
```

**Tips:**
- Use multiple light sources for realistic lighting
- Cast shadows from directional light for depth
- Adjust intensity to prevent overexposure

## Asset Pipeline

### Storing GLB Models

Models are stored in `apps/web/public/three/`:

```
public/three/
├── office.glb          # Office environment model
├── logo.glb            # Logo/branding model
└── [other-models].glb
```

### Git LFS Setup

Large GLB files use Git LFS to avoid bloating the repository:

```bash
# Track GLB files with Git LFS
git lfs track "*.glb"
git add .gitattributes

# Add GLB file
git add public/three/office.glb
git commit -m "Add office GLB model"
```

### Loading Models

Use `useGLTF` hook from Drei:

```typescript
import { useGLTF } from '@react-three/drei';

export function OfficeModel() {
  const { scene } = useGLTF('/three/office.glb');

  return <primitive object={scene} />;
}
```

**Error Handling:**

```typescript
export function OfficeModel() {
  const { scene, error } = useGLTF('/three/office.glb');

  if (error) {
    return <text position={[0, 1, 0]}>Failed to load model</text>;
  }

  return scene ? <primitive object={scene} /> : null;
}
```

### Model Optimization

1. **Bake Lighting** - Pre-bake lights into textures to reduce runtime calculations
2. **LOD Models** - Use lower polygon versions at distance
3. **Texture Compression** - Use compressed texture formats (KTX2, WebP)
4. **Cleanup** - Remove unnecessary nodes in Blender before export

## Physics Integration

### World Setup

```typescript
<Physics
  gravity={[0, -9.81, 0]}
  timeStep="vary"
  debug
>
  {/* Physics bodies */}
</Physics>
```

**Props:**
- `gravity` - [x, y, z] acceleration vector
- `timeStep` - "fixed" | "vary" | number
- `debug` - Show physics wireframe (dev only)

### Static Colliders (Walls, Floor)

```typescript
import { RigidBody, Collider } from '@react-three/rapier';

export function FloorCollider() {
  return (
    <RigidBody type="fixed" name="floor">
      <Collider shape="cuboid" args={[10, 0.5, 10]} />
      <mesh>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
}
```

### Dynamic Colliders (Player)

```typescript
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function PlayerController() {
  const playerRef = useRef(null);

  useFrame(() => {
    if (playerRef.current) {
      // Apply movement forces
      playerRef.current.applyImpulse([directionX, 0, directionZ], true);
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      type="dynamic"
      name="player"
      mass={1}
      linearDamping={0.5}
      angularDamping={0.99}
    >
      <CapsuleCollider args={[0.8, 0.5]} />
    </RigidBody>
  );
}
```

### Trigger Zones (Interaction Areas)

```typescript
import { RigidBody, Collider } from '@react-three/rapier';

export function InteractionZone({ onEnter, onExit }) {
  return (
    <RigidBody type="fixed" name="trigger-zone" isSensor>
      <Collider
        shape="cuboid"
        args={[5, 5, 5]}
        onIntersectionEnter={() => onEnter()}
        onIntersectionExit={() => onExit()}
      />
    </RigidBody>
  );
}
```

## Player Controls

### First-Person Camera

```typescript
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export function FirstPersonController() {
  const { camera } = useThree();
  const keysPressed = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 0.1;

    if (keysPressed.current['w']) camera.position.z -= speed;
    if (keysPressed.current['s']) camera.position.z += speed;
    if (keysPressed.current['a']) camera.position.x -= speed;
    if (keysPressed.current['d']) camera.position.x += speed;
  });

  return null;
}
```

### Mouse Look (FPS Style)

```typescript
import { PointerLockControls } from '@react-three/drei';
import { useRef } from 'react';

export function MouseLookControls() {
  const controlsRef = useRef(null);

  return <PointerLockControls ref={controlsRef} />;
}
```

## Postprocessing Effects

### Depth of Field

```typescript
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

<EffectComposer>
  <DepthOfField
    focusDistance={0}
    focalLength={0.02}
    bokehScale={2}
  />
</EffectComposer>
```

### Bloom (Glow Effect)

```typescript
import { EffectComposer, Bloom } from '@react-three/postprocessing';

<EffectComposer>
  <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.8} />
</EffectComposer>
```

## Performance Optimization

### LOD (Level of Detail)

Use lower polygon models at distance:

```typescript
import { Lod } from '@react-three/drei';

<Lod distances={[10, 50, 100]}>
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
  </mesh>
  <mesh>
    <boxGeometry args={[1, 1, 1]} /> {/* Simpler version */}
  </mesh>
  <mesh>
    <boxGeometry args={[1, 1, 1]} /> {/* Simplest version */}
  </mesh>
</Lod>
```

### Frustum Culling

Three.js automatically culls objects outside camera view. Ensure objects use bounding boxes correctly:

```typescript
<mesh>
  <boxGeometry />
  <meshStandardMaterial />
</mesh>
```

### Reducing Draw Calls

- Combine geometries when possible
- Use instancing for repeated objects
- Texture atlasing to reduce texture switches

### Monitoring Performance

```typescript
import { Stats } from '@react-three/drei';

<Stats /> {/* Shows FPS, memory, etc. */}
```

## Debugging

### Physics Debug Visualization

```typescript
<Physics debug>
  {/* Physics bodies show as wireframes */}
</Physics>
```

### Scene Inspector

Drei provides `PerspectiveCamera` and helpers:

```typescript
import { CameraControls, Grid } from '@react-three/drei';

<Grid args={[10, 10]} cellSize={1} />
<CameraControls />
```

## Common Issues

### Models Not Displaying

1. Check file path: `/three/office.glb` (from public folder)
2. Verify Git LFS: `git lfs ls-files`
3. Check browser console for load errors
4. Ensure model has geometry and material

### Physics Not Working

1. Verify RigidBody and Collider are in Physics world
2. Check gravity direction: `[0, -9.81, 0]` for downward
3. Ensure dynamic bodies have mass > 0
4. Check collision pairs with debug visualization

### Performance Issues

1. Reduce shadow resolution
2. Decrease postprocessing quality
3. Enable LOD for distant objects
4. Use WebGL inspector to find bottlenecks

## Related Documentation

- **ANIMATIONS.md** - Animation patterns (Motion integration)
- **CONTENT.md** - Zone interaction and content structures
- **ARCHITECTURE.md** - System design overview
