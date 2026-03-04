# Content and Zone System

Complete guide to data structures, content pipeline, and zone interactions in Kiban.

## Overview

The content system provides structured data for zones, locations, and interactive content. Content is separated from code as JSON files, enabling non-technical updates and version control.

**Core Files:**
- `apps/web/data/zones.json` - Zone definitions and metadata
- `apps/web/data/landing.json` - Landing page content
- `apps/web/types/zones.ts` - TypeScript type definitions
- `apps/web/hooks/use-zone-interaction.ts` - Zone state management hook

## Zone Structure

### zones.json Format

```json
{
  "zones": [
    {
      "id": "entrance",
      "name": "Main Entrance",
      "description": "Welcome to our office",
      "position": [0, 0, 0],
      "size": [10, 10, 10],
      "category": "public",
      "content": "# Welcome\n\nThis is the main entrance...",
      "metadata": {
        "color": "#3b82f6",
        "icon": "door",
        "audio": null
      }
    }
  ]
}
```

### Zone Fields

#### id (string, required)
Unique identifier for the zone.

- Format: kebab-case (lowercase, hyphens)
- Used in routing and state management
- Example: `"office-floor-1"`, `"meeting-room-a"`

#### name (string, required)
Human-readable display name.

- Shown in UI and zone labels
- Example: `"Meeting Room A"`

#### description (string, required)
Short description of the zone.

- Used in zone previews and tooltips
- Keep under 100 characters
- Example: `"Conference room on the 2nd floor"`

#### position (array [x, y, z], required)
3D world position for zone trigger placement.

- x, y, z coordinates as numbers
- Meters in 3D space
- Example: `[5.2, 2.0, -3.5]`

#### size (array [width, height, depth], required)
Dimensions of the zone trigger volume.

- Used for collision detection
- Represents the interactive area
- Example: `[10, 3, 8]` means 10m wide, 3m tall, 8m deep

#### category (string, required)
Zone category for filtering and grouping.

- Options: `"public"`, `"private"`, `"meeting"`, `"break"`, `"outdoor"`
- Used in UI filtering and permissions
- Example: `"meeting"`

#### content (string, required)
Markdown content displayed when zone is active.

- Supports full markdown syntax
- Can include images with relative paths
- HTML is sanitized for security
- Example: `"# Meeting Room\n\nCapacity: 8 people\n\n![Floor plan](/images/room.png)"`

#### metadata (object, required)
Additional zone metadata.

```json
{
  "color": "#3b82f6",      // Hex color for zone in UI
  "icon": "door",          // Icon name (see icon system)
  "audio": null,           // Audio file URL or null
  "capacity": 8,           // Optional: person capacity
  "amenities": ["projector", "whiteboard"],  // Optional: list of amenities
  "floor": 1,              // Optional: floor number
  "availableFrom": null,   // Optional: ISO date when zone unlocks
  "availableTo": null      // Optional: ISO date when zone closes
}
```

## Content Type Definitions

### Zone Metadata Type

```typescript
// apps/web/types/zones.ts

export interface ZoneMetadata {
  id: string
  name: string
  description: string
  position: [number, number, number]
  size: [number, number, number]
  category: 'public' | 'private' | 'meeting' | 'break' | 'outdoor'
  content: string
  metadata: {
    color: string
    icon: string
    audio: string | null
    capacity?: number
    amenities?: string[]
    floor?: number
    availableFrom?: string | null
    availableTo?: string | null
  }
}

export interface ZonesData {
  version: string
  zones: ZoneMetadata[]
}
```

## Zone Interaction Hook

The `use-zone-interaction` hook manages zone state and transitions.

### Basic Usage

```tsx
import { useZoneInteraction } from '@/hooks/use-zone-interaction'

export function OfficeScene() {
  const { displayedZone, handleZoneEnter, handleZoneExit } =
    useZoneInteraction()

  return (
    <div>
      <Canvas>
        <Physics>
          {/* Zone trigger volumes */}
          {zones.map((zone) => (
            <ZoneTrigger
              key={zone.id}
              zone={zone}
              onEnter={() => handleZoneEnter(zone.id)}
              onExit={handleZoneExit}
            />
          ))}
          <Player />
        </Physics>
      </Canvas>

      {/* Display zone content */}
      {displayedZone && (
        <ZonePanel zone={displayedZone} />
      )}
    </div>
  )
}
```

### Hook Return Values

```typescript
interface UseZoneInteraction {
  zoneMap: Map<string, ZoneMetadata>
  displayedZone: ZoneMetadata | null
  handleZoneEnter: (zoneName: string) => void
  handleZoneExit: () => void
  currentZoneId: string | null
}
```

- **zoneMap**: Map of all zones by ID for quick lookup
- **displayedZone**: Currently active zone content
- **handleZoneEnter**: Callback when entering a zone trigger
- **handleZoneExit**: Callback when leaving a zone trigger
- **currentZoneId**: ID of currently active zone

### State Behavior

```typescript
// zones.json
{
  "zones": [
    { "id": "default", ... },
    { "id": "meeting-room-a", ... }
  ]
}

// On page load:
// 1. useZoneInteraction reads zones.json
// 2. Sets displayedZone to the "default" zone
// 3. User enters "meeting-room-a" trigger
// 4. handleZoneEnter("meeting-room-a") is called
// 5. displayedZone updates to "meeting-room-a"
// 6. Content panel shows "meeting-room-a" content
// 7. User leaves trigger
// 8. handleZoneExit() is called
// 9. displayedZone persists (doesn't reset to default)
```

**Content Persistence:** Zones persist on exit, only change on enter. This prevents UI flickering when briefly leaving zone bounds.

## Landing Page Content

### landing.json Format

```json
{
  "version": "1.0.0",
  "hero": {
    "title": "Welcome to Kiban",
    "subtitle": "Experience our office in 3D",
    "cta": {
      "text": "Explore Now",
      "href": "/office"
    }
  },
  "features": [
    {
      "title": "3D Environment",
      "description": "Explore our office in full 3D",
      "icon": "cube"
    }
  ],
  "sections": [
    {
      "id": "about",
      "title": "About Us",
      "content": "Markdown content here..."
    }
  ]
}
```

### Landing Page Fields

#### hero
Main hero section with headline and call-to-action.

```json
{
  "title": "string",         // Main headline
  "subtitle": "string",      // Subheading
  "image": "string",         // Background image URL
  "cta": {
    "text": "string",        // Button text
    "href": "string"         // Button link
  }
}
```

#### features
Array of feature cards.

```json
[
  {
    "title": "string",       // Feature title
    "description": "string", // Feature description
    "icon": "string"         // Icon name
  }
]
```

#### sections
Array of content sections.

```json
[
  {
    "id": "string",          // Section identifier
    "title": "string",       // Section heading
    "content": "string",     // Markdown content
    "layout": "string"       // "grid", "list", or "text"
  }
]
```

## Content Pipeline

### Loading Content

```typescript
// apps/web/lib/content-parser.ts

import zoneDataJson from '@/data/zones.json'

/**
 * Parse and validate zone data from JSON.
 * Ensures all required fields are present and properly typed.
 *
 * @param rawData - Raw zone JSON data
 * @returns Validated and typed zone array
 * @throws Error if validation fails
 */
export function parseZoneData(rawData: unknown): ZoneMetadata[] {
  if (!isZonesData(rawData)) {
    throw new Error('Invalid zones.json structure')
  }
  return rawData.zones
}

/**
 * Type guard for zones data validation.
 * Ensures data matches the ZonesData interface.
 */
export function isZonesData(data: unknown): data is ZonesData {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray((data as any).zones) &&
    (data as any).zones.every(isZoneMetadata)
  )
}
```

### Using Content in Components

```tsx
import zoneDataJson from '@/data/zones.json'
import type { ZoneMetadata } from '@/types/zones'

export function ZoneList() {
  const zones = zoneDataJson.zones as ZoneMetadata[]

  return (
    <ul>
      {zones.map((zone) => (
        <li key={zone.id}>
          <h3>{zone.name}</h3>
          <p>{zone.description}</p>
        </li>
      ))}
    </ul>
  )
}
```

### Markdown Rendering

Zone content is markdown that needs to be rendered as HTML:

```tsx
import { markdownToHtml } from '@/lib/markdown'

export function ZonePanel({ zone }: { zone: ZoneMetadata }) {
  const html = markdownToHtml(zone.content)

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

## Validation & Constraints

### Required Fields Validation

```typescript
// Type system enforces at compile time
const zone: ZoneMetadata = {
  // ✅ All required fields
  id: 'meeting-room-a',
  name: 'Meeting Room A',
  description: 'Conference room',
  position: [5, 0, 10],
  size: [10, 3, 8],
  category: 'meeting',
  content: '# Meeting Room A',
  metadata: {
    color: '#3b82f6',
    icon: 'door',
    audio: null,
  },
}
```

### Content Constraints

```json
{
  "content": "# Max 10,000 chars | Markdown only | No raw HTML | No scripts"
}
```

### Position Constraints

- X, Y, Z coordinates: -1000 to 1000 (inclusive)
- Positions should map to 3D scene coordinates
- Negative Y is typically below ground level
- Consider world scale when setting positions

### Size Constraints

- Width, height, depth: 0.1 to 100 (meters)
- Should match collision detection needs
- Larger zones = easier to enter, bigger collision volumes
- Typical office zones: 5-20 meters

## Content Updates Workflow

### Adding a New Zone

1. Edit `apps/web/data/zones.json`
2. Add zone object with all required fields
3. Test in local environment
4. Commit with: `git commit -m "content: add [zone-name] zone"`

```json
{
  "id": "new-zone",
  "name": "New Zone",
  "description": "Zone description",
  "position": [0, 0, 0],
  "size": [10, 3, 8],
  "category": "public",
  "content": "# Zone Title\n\nZone markdown content",
  "metadata": {
    "color": "#3b82f6",
    "icon": "door",
    "audio": null
  }
}
```

### Updating Zone Content

1. Edit `content` field in zones.json
2. Use markdown syntax for formatting
3. Test markdown renders correctly
4. Commit: `git commit -m "content: update [zone-id] content"`

### Reordering Zones

Edit the order of zone objects in the `zones` array. First zone is often the default.

## Best Practices

### Naming Conventions

- **Zone IDs**: kebab-case, descriptive, unique
  - ✅ `"meeting-room-a"`, `"break-room-2nd-floor"`
  - ❌ `"room1"`, `"MeetingRoom_A"`, `"zone_123"`

- **Zone Names**: Title Case, human-readable
  - ✅ `"Meeting Room A"`, `"2nd Floor Break Room"`
  - ❌ `"meeting-room-a"`, `"MEETING ROOM A"`

### Content Guidelines

- Keep descriptions under 100 characters
- Use markdown for formatting (# headings, **bold**, etc.)
- Include relevant information: capacity, amenities, hours
- Use consistent terminology across zones

### Performance

- Lazy load zone content (load on demand)
- Cache parsed zone data
- Minimize markdown rendering during animation
- Preload only visible/nearby zones

## Related Documentation

- `ARCHITECTURE.md` - System design
- `THREE.md` - 3D zone trigger setup
- `use-zone-interaction.ts` - Hook implementation
- Markdown spec: https://spec.commonmark.org/

## Examples

### Complete zones.json Example

```json
{
  "version": "1.0.0",
  "zones": [
    {
      "id": "default",
      "name": "Welcome",
      "description": "Main office entrance",
      "position": [0, 0, 0],
      "size": [20, 5, 15],
      "category": "public",
      "content": "# Welcome to Kiban\n\nExplore our modern office space.\n\n**Hours:** 9am - 6pm\n**Location:** Downtown",
      "metadata": {
        "color": "#3b82f6",
        "icon": "door",
        "audio": null,
        "floor": 1
      }
    },
    {
      "id": "meeting-room-a",
      "name": "Meeting Room A",
      "description": "Executive conference room",
      "position": [15, 0, 10],
      "size": [12, 3, 10],
      "category": "meeting",
      "content": "# Meeting Room A\n\n**Capacity:** 12 people\n**Amenities:** \n- 4K Display\n- Video conferencing\n- Whiteboard\n- Kitchen area\n\n[Book now](https://calendar.example.com)",
      "metadata": {
        "color": "#8b5cf6",
        "icon": "video",
        "audio": null,
        "capacity": 12,
        "amenities": ["display", "conferencing", "whiteboard"],
        "floor": 2
      }
    },
    {
      "id": "break-room",
      "name": "Break Room",
      "description": "Coffee and relaxation area",
      "position": [-10, 0, 5],
      "size": [10, 3, 8],
      "category": "break",
      "content": "# Break Room\n\nTake a break and recharge!\n\n**Available:** 7am - 7pm\n**Features:** Coffee, snacks, seating",
      "metadata": {
        "color": "#ec4899",
        "icon": "coffee",
        "audio": null,
        "floor": 1
      }
    }
  ]
}
```
