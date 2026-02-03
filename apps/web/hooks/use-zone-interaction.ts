'use client'

import { useEffect, useState } from 'react'

import zoneDataJson from '@/data/zones.json'
import type { ZoneMetadata } from '@/types/zones'

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
