'use client'

import { useEffect, useState } from 'react'

import zoneDataJson from '@/data/zones.json'
import type { ZoneMetadata } from '@/types/zones'

/**
 * Hook for managing zone interaction state and transitions.
 *
 * Handles loading zone metadata from zones.json, tracking which zone the user
 * is currently in, and updating displayed content when the user enters a new zone.
 * Content persists when exiting a zone, only updating when entering a different zone.
 *
 * @returns Object containing:
 *   - displayedZone: Currently displayed zone metadata, or null before initialization
 *   - handleZoneEnter: Function to call when user enters a zone (passes zone id)
 *   - handleZoneExit: Placeholder function for symmetry (no-op by design)
 *
 * @example
 * ```ts
 * export function ZoneDisplay() {
 *   const { displayedZone, handleZoneEnter } = useZoneInteraction()
 *
 *   return (
 *     <>
 *       {/* Physics trigger */}
 *       <RigidBody isSensor>
 *         <mesh onPointerEnter={() => handleZoneEnter('office-main')} />
 *       </RigidBody>
 *
 *       {/* Content display */}
 *       {displayedZone && (
 *         <div>
 *           <h1>{displayedZone.content.title}</h1>
 *         </div>
 *       )}
 *     </>
 *   )
 * }
 * ```
 *
 * @see {@link apps/web/data/zones.json} for zone structure
 * @see {@link apps/web/CONTENT.md} for complete content management guide
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
