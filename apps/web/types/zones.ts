export interface ZoneMetadata {
	id: string
	title: string
	description: string
	type?: string
	promptText?: string
}

export interface ZoneData {
	zones: ZoneMetadata[]
}
