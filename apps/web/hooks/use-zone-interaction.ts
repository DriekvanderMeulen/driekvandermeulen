'use client'

import { useEffect, useState } from 'react'

import zoneDataJson from '@/data/zones.json'
import type { ZoneMetadata } from '@/types/zones'

/**
 * Hook for managing zone interaction state in the 3D environment.
 *
 * Loads zone metadata from zones.json and manages which zone's content is currently displayed.
 * The displayed zone persists when exiting trigger volumes - content only changes on zone entry.
 *
 * **Zone Loading:**
 * - Reads zones from apps/web/data/zones.json on mount
 * - Creates a Map for O(1) zone lookup by ID
 * - Initializes with 'default' zone if it exists
 *
 * **Zone Transitions:**
 * - handleZoneEnter(id): Called when player enters a zone trigger
 * - handleZoneExit(): Called when exiting, but doesn't change displayed zone
 * - This prevents content flickering during brief exits
 *
 * **Usage in Three.js:**
 * Connect physics collision detection to zone triggers:
 * - onIntersectionEnter → handleZoneEnter
 * - onIntersectionExit → handleZoneExit
 *
 * @example
 * import { useZoneInteraction } from '@/hooks/use-zone-interaction'
 *
 * export function OfficeScene() {
 *   const { displayedZone, handleZoneEnter, handleZoneExit } =
 *     useZoneInteraction()
 *
 *   return (
 *     <>
 *       <Canvas>
 *         <Physics>
 *           {zones.map((zone) => (
 *             <ZoneTrigger
 *               key={zone.id}
 *               zone={zone}
 *               onEnter={() => handleZoneEnter(zone.id)}
 *               onExit={handleZoneExit}
 *             />
 *           ))}
 *         </Physics>
 *       </Canvas>
 *
 *       {displayedZone && <ZonePanel content={displayedZone.content} />}
 *     </>
 *   )
 * }
 *
 * @returns Object with zone state and handlers
 * @returns {Map<string, ZoneMetadata>} zoneMap - All zones by ID
 * @returns {ZoneMetadata | null} displayedZone - Currently displayed zone
 * @returns {(id: string) => void} handleZoneEnter - Called on zone entry
 * @returns {() => void} handleZoneExit - Called on zone exit
 *
 * @see apps/web/data/zones.json - Zone data source
 * @see apps/web/types/zones.ts - ZoneMetadata type definition
 * @see apps/web/CONTENT.md - Zone system documentation
 */
export function useZoneInteraction() {
	const [zoneMap, setZoneMap] = useState<Map<string, ZoneMetadata>>(new Map())
	const [displayedZone, setDisplayedZone] = useState<ZoneMetadata | null>(null)

	useEffect(() => {
		const map = new Map(zoneDataJson.zones.map((zone) => [zone.id, zone]))
		setZoneMap(map)

		// Set default zone on initialization
		const defaultZone = zoneDataJson.zones.find((z) => z.id === 'default')
		if (defaultZone) {
			setDisplayedZone(defaultZone)
		}
	}, [])

	const handleZoneEnter = (zoneName: string) => {
		const metadata = zoneMap.get(zoneName)
		if (metadata) {
			setDisplayedZone(metadata)
		}
	}

	// Content persists on exit - only update on enter
	const handleZoneExit = () => {}

	return {
		displayedZone,
		handleZoneEnter,
		handleZoneExit,
	}
}
