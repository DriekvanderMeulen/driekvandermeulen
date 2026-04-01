export interface ZoneMetadata {
	id: string
	title: string
	description: string
	type?: string
	promptText?: string
}

interface ZoneData {
	zones: Array<ZoneMetadata>
}
