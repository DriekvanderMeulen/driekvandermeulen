/**
 * One-time upload script for office.glb to Vercel Blob Storage.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN="your-token" bun run scripts/upload-glb.ts
 *
 * Get the token from Vercel Dashboard → Storage → kiban-assets → Settings.
 */
import { put } from '@vercel/blob'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const FILE_PATH = resolve(
	import.meta.dirname,
	'../apps/web/public/three/office.glb',
)
const BLOB_PATH = 'three/office.glb'

async function main() {
	if (!process.env.BLOB_READ_WRITE_TOKEN) {
		console.error(
			'Missing BLOB_READ_WRITE_TOKEN. Get it from Vercel Dashboard → Storage → kiban-assets → Settings.',
		)
		process.exit(1)
	}

	console.log(`Reading ${FILE_PATH}...`)
	const file = readFileSync(FILE_PATH)
	console.log(`File size: ${(file.byteLength / 1024 / 1024).toFixed(1)} MB`)

	console.log(`Uploading to Vercel Blob as "${BLOB_PATH}"...`)
	const blob = await put(BLOB_PATH, file, {
		access: 'public',
		addRandomSuffix: false,
		contentType: 'model/gltf-binary',
		multipart: true,
	})

	console.log('\nUpload complete!')
	console.log(`URL: ${blob.url}`)
	console.log(
		`\nSet this as your env var:\n  NEXT_PUBLIC_GLB_URL="${blob.url}"`,
	)
}

main().catch((err) => {
	console.error('Upload failed:', err)
	process.exit(1)
})
