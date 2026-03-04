# Content Management Guide

Guide to content structures, data pipeline, and zone interaction system in the Kiban application. Content is managed through static JSON files that define interactive environments and content.

## Overview

The content system uses static JSON files to define:

- **Zones** - Interactive 3D environment areas with metadata
- **Landing** - Home page content sections
- **Pages** - Generic page content structures

This approach keeps content separate from code, allowing non-developers to manage content without rebuilds (in most cases).

## Content Directory

```
apps/web/data/
├── zones.json          # Zone definitions and metadata
├── landing.json        # Landing page sections
└── [other-content].json
```

## zones.json Structure

### Schema

```json
{
  "zones": [
    {
      "id": "default",
      "name": "Default Zone",
      "description": "Main entry zone",
      "icon": "home",
      "color": "#3b82f6",
      "position": [0, 0, 0],
      "scale": 1,
      "content": {
        "title": "Welcome",
        "subtitle": "Explore the office",
        "description": "Navigate using WASD keys",
        "cta": {
          "text": "Get Started",
          "href": "/features"
        }
      },
      "metadata": {
        "category": "main",
        "tags": ["entrance", "tutorial"],
        "unlocked": true
      }
    }
  ]
}
```

### Field Descriptions

**Core Fields**

- `id` - Unique identifier for zone (kebab-case)
- `name` - Display name for zone
- `description` - Short summary of zone purpose
- `icon` - Icon identifier (emoji or icon set name)
- `color` - Hex color for UI representation

**3D Properties**

- `position` - [x, y, z] coordinates in 3D space
- `scale` - Relative size in 3D world

**Content**

- `content.title` - Zone title to display
- `content.subtitle` - Secondary heading
- `content.description` - Detailed description
- `content.cta` - Call-to-action button

**Metadata**

- `metadata.category` - Zone category (main, feature, detail)
- `metadata.tags` - Array of tags for filtering
- `metadata.unlocked` - Whether zone is accessible

## Using Zones in Components

### useZoneInteraction Hook

```typescript
import { useZoneInteraction } from '@/hooks/use-zone-interaction';

export function ZoneDisplay() {
  const { displayedZone, handleZoneEnter } = useZoneInteraction();

  if (!displayedZone) return <div>Loading...</div>;

  return (
    <div>
      <h1>{displayedZone.content.title}</h1>
      <p>{displayedZone.content.description}</p>
      {displayedZone.content.cta && (
        <a href={displayedZone.content.cta.href}>
          {displayedZone.content.cta.text}
        </a>
      )}
    </div>
  );
}
```

### Detecting Zone Entry

In your 3D scene with Rapier physics:

```typescript
import { useZoneInteraction } from '@/hooks/use-zone-interaction';
import { RigidBody } from '@react-three/rapier';

export function InteractiveTrigger({ zoneId }) {
  const { handleZoneEnter } = useZoneInteraction();

  return (
    <RigidBody type="fixed" isSensor name={`trigger-${zoneId}`}>
      <mesh
        onPointerEnter={() => handleZoneEnter(zoneId)}
        geometry={/* collision geometry */}
      />
    </RigidBody>
  );
}
```

## landing.json Structure

### Schema

```json
{
  "hero": {
    "title": "Welcome to Kiban",
    "subtitle": "Interactive 3D Experience",
    "description": "Explore immersive environments",
    "cta": {
      "text": "Enter Office",
      "href": "/office"
    }
  },
  "features": [
    {
      "id": "feature-1",
      "title": "3D Environments",
      "description": "Explore interactive spaces",
      "icon": "cube"
    }
  ],
  "testimonials": [
    {
      "id": "testimonial-1",
      "quote": "Amazing experience",
      "author": "User",
      "role": "Customer"
    }
  ],
  "faq": [
    {
      "id": "faq-1",
      "question": "How do I navigate?",
      "answer": "Use WASD keys to move"
    }
  ]
}
```

### Usage

```typescript
import landingData from '@/data/landing.json';

export function LandingPage() {
  return (
    <div>
      <h1>{landingData.hero.title}</h1>
      <section>
        {landingData.features.map((feature) => (
          <div key={feature.id}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

## Content Parser Utility

### Type-Safe Content Access

Use `content-parser.ts` for validated content access:

```typescript
import { getZoneById, getAllZones } from '@/lib/content-parser';

// Get single zone
const zone = getZoneById('office-main');

if (zone) {
  console.log(zone.content.title);
}

// Get all zones
const zones = getAllZones();
zones.forEach((zone) => {
  console.log(zone.name);
});
```

### Implementation Example

```typescript
// apps/web/lib/content-parser.ts
import zones from '@/data/zones.json';
import type { ZoneMetadata } from '@/types/zones';

export function getZoneById(id: string): ZoneMetadata | undefined {
  return zones.zones.find((zone) => zone.id === id);
}

export function getAllZones(): ZoneMetadata[] {
  return zones.zones;
}

export function getZonesByCategory(category: string): ZoneMetadata[] {
  return zones.zones.filter((zone) => zone.metadata?.category === category);
}
```

## Zone Interaction Flow

### Complete Interaction Sequence

```
User Movement in 3D Space
    ↓
Physics Engine Detects Collision
    ↓
Trigger Zone onIntersectionEnter Event
    ↓
handleZoneEnter('zone-id') Called
    ↓
Zone Lookup in Map (zones.json)
    ↓
displayedZone State Updated
    ↓
Content Displayed to User
```

### Example Implementation

```typescript
import { RigidBody } from '@react-three/rapier';
import { useZoneInteraction } from '@/hooks/use-zone-interaction';

export function OfficeZone() {
  const { displayedZone, handleZoneEnter } = useZoneInteraction();

  return (
    <>
      {/* Physics trigger for zone entrance */}
      <RigidBody type="fixed" isSensor>
        <mesh
          position={[0, 0, 0]}
          scale={[10, 3, 10]}
          onPointerEnter={() => handleZoneEnter('office-entrance')}
        >
          <boxGeometry />
        </mesh>
      </RigidBody>

      {/* Display zone content */}
      {displayedZone && (
        <div className="absolute bottom-8 left-8 bg-white p-6 rounded-lg shadow-lg">
          <h2>{displayedZone.content.title}</h2>
          <p>{displayedZone.content.description}</p>
          {displayedZone.content.cta && (
            <a href={displayedZone.content.cta.href} className="btn mt-4">
              {displayedZone.content.cta.text}
            </a>
          )}
        </div>
      )}
    </>
  );
}
```

## TypeScript Types

### Zone Type

```typescript
// apps/web/types/zones.ts
export interface ZoneMetadata {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  position?: [number, number, number];
  scale?: number;
  content: {
    title: string;
    subtitle?: string;
    description: string;
    cta?: {
      text: string;
      href: string;
    };
  };
  metadata?: {
    category?: string;
    tags?: string[];
    unlocked?: boolean;
  };
}

export interface ZonesData {
  zones: ZoneMetadata[];
}
```

## Adding New Content

### Adding a New Zone

1. **Edit zones.json**

```json
{
  "zones": [
    // ... existing zones ...
    {
      "id": "new-zone",
      "name": "New Interactive Area",
      "description": "Description of new area",
      "content": {
        "title": "New Zone",
        "description": "Content description",
        "cta": {
          "text": "Learn More",
          "href": "/new-feature"
        }
      }
    }
  ]
}
```

2. **Add Trigger in 3D Scene**

```typescript
import { useZoneInteraction } from '@/hooks/use-zone-interaction';

export function NewZoneTrigger() {
  const { handleZoneEnter } = useZoneInteraction();

  return (
    <RigidBody type="fixed" isSensor>
      <mesh onPointerEnter={() => handleZoneEnter('new-zone')}>
        <boxGeometry args={[5, 3, 5]} />
      </mesh>
    </RigidBody>
  );
}
```

### Adding Landing Page Section

1. **Edit landing.json**

```json
{
  "newSection": {
    "id": "new-section",
    "title": "New Section",
    "items": []
  }
}
```

2. **Use in Component**

```typescript
import landingData from '@/data/landing.json';

export function NewSection() {
  return (
    <section>
      <h2>{landingData.newSection.title}</h2>
    </section>
  );
}
```

## Performance Considerations

### Content Loading

- JSON files are bundled with the application
- No network requests needed at runtime
- Content is available immediately

### Large Datasets

If zones.json becomes very large:

1. Split into multiple files: `zones-main.json`, `zones-details.json`
2. Load dynamically: `import()`
3. Create content index for faster lookups

### Optimization Example

```typescript
// Pre-index zones for O(1) lookup
const zoneIndex = new Map(
  zones.zones.map((zone) => [zone.id, zone])
);

export function getZoneById(id: string) {
  return zoneIndex.get(id);
}
```

## Validation & Errors

### Validate Zone Data

```typescript
import type { ZoneMetadata } from '@/types/zones';

function isValidZone(zone: unknown): zone is ZoneMetadata {
  if (!zone || typeof zone !== 'object') return false;

  const z = zone as Record<string, unknown>;
  return (
    typeof z.id === 'string' &&
    typeof z.name === 'string' &&
    z.content &&
    typeof z.content === 'object'
  );
}

// Usage
try {
  const zone = zones.zones.find((z) => z.id === id);
  if (!isValidZone(zone)) throw new Error('Invalid zone data');
} catch (error) {
  console.error('Zone loading failed:', error);
}
```

## Related Documentation

- **THREE.md** - 3D scene implementation for zones
- **ARCHITECTURE.md** - Content system role in architecture
- **DEVELOPMENT.md** - How to test content changes
