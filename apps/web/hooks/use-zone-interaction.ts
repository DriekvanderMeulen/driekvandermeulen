'use client'

import { useEffect, useState } from 'react'

import zoneDataJson from '@/data/zones.json'
import type { ZoneMetadata } from '@/types/zones'

/**
 * Hook for managing zone-based interactions in the 3D scene.
 *
 * Tracks which zone the player is currently in and provides metadata
 * for displaying zone-specific content. Zones are loaded from the
 * zones.json data file on initialization.
 *
 * @returns Object containing:
 *   - `displayedZone` - Currently active zone metadata (persists after exit)
 *   - `handleZoneEnter` - Callback for when player enters a zone
 *   - `handleZoneExit` - Callback for when player exits a zone (no-op, content persists)
 *
 * @example
 * ```typescript
 * const { displayedZone, handleZoneEnter, handleZoneExit } = useZoneInteraction()
 *
 * // In 3D scene collision handler
 * <RigidBody
 *   onCollisionEnter={() => handleZoneEnter('lobby')}
 *   onCollisionExit={handleZoneExit}
 * />
 *
 * // Display zone content
 * {displayedZone && <ZonePanel title={displayedZone.title} />}
 * ```
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
