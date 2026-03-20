'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const OfficeScene = dynamic(() => import('@/components/office-scene'), {
	ssr: false,
})

const ACCESS_CODE = '221000'

export default function OfficePage() {
	const [authenticated, setAuthenticated] = useState(false)
	const [code, setCode] = useState('')
	const [error, setError] = useState(false)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (code === ACCESS_CODE) {
			setAuthenticated(true)
		} else {
			setError(true)
			setCode('')
		}
	}

	if (authenticated) {
		return (
			<div className="fixed inset-0 m-0 h-[var(--viewport-height)] w-[var(--viewport-width)] overflow-hidden p-0">
				<OfficeScene />
			</div>
		)
	}

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#000',
				color: '#fff',
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<label
					htmlFor="access-code"
					style={{
						fontSize: '0.875rem',
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
					}}
				>
					Enter access code
				</label>
				<input
					id="access-code"
					type="password"
					inputMode="numeric"
					value={code}
					onChange={(e) => {
						setCode(e.target.value)
						setError(false)
					}}
					autoFocus
					style={{
						background: 'transparent',
						border: '1px solid #333',
						borderColor: error ? '#ef4444' : '#333',
						color: '#fff',
						padding: '0.5rem 1rem',
						fontSize: '1.25rem',
						textAlign: 'center',
						letterSpacing: '0.5em',
						outline: 'none',
						width: '12rem',
					}}
				/>
				{error ? (
					<p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>
						Invalid code
					</p>
				) : null}
			</form>
		</div>
	)
}
