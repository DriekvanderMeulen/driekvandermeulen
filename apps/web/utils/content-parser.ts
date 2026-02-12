type ParsedContentItem =
	| {
			kind: 'paragraph'
			text: string
	  }
	| {
			kind: 'subtitle'
			text: string
	  }
	| {
			kind: 'custom-div'
			className: string
			children: Array<ParsedContentItem>
	  }

type ParsedContent = {
	title: string | null
	content: Array<ParsedContentItem>
}

function normalizeParagraphLines(paragraphLines: Array<string>): string {
	return paragraphLines.join(' ').replace(/\s+/g, ' ').trim()
}

function parseContentDocument(rawDocument: string): ParsedContent {
	const contentItems: Array<ParsedContentItem> = []
	let title: string | null = null
	const paragraphBuffer: Array<string> = []
	let currentCustomDiv: string | null = null
	const customDivChildren: Array<ParsedContentItem> = []

	const commitParagraph = () => {
		const normalizedParagraph = normalizeParagraphLines(paragraphBuffer)
		if (normalizedParagraph.length > 0) {
			const item: ParsedContentItem = {
				kind: 'paragraph',
				text: normalizedParagraph,
			}

			if (currentCustomDiv) {
				customDivChildren.push(item)
			} else {
				contentItems.push(item)
			}
		}
		paragraphBuffer.length = 0
	}

	const commitCustomDiv = () => {
		if (currentCustomDiv && customDivChildren.length > 0) {
			contentItems.push({
				kind: 'custom-div',
				className: currentCustomDiv,
				children: [...customDivChildren],
			})
			customDivChildren.length = 0
		}
		currentCustomDiv = null
	}

	const lines = rawDocument.split(/\r?\n/)

	for (const line of lines) {
		const trimmedLine = line.trim()

		// Check for custom div start: [div:className]
		if (trimmedLine.startsWith('[div:') && trimmedLine.endsWith(']')) {
			commitParagraph()
			commitCustomDiv()
			const className = trimmedLine.slice(5, -1).trim()
			if (className.length > 0) {
				currentCustomDiv = className
			}
			continue
		}

		// Check for custom div end: [/div]
		if (trimmedLine === '[/div]') {
			commitParagraph()
			commitCustomDiv()
			continue
		}

		if (trimmedLine.length === 0) {
			commitParagraph()
			continue
		}

		if (trimmedLine === '#') {
			commitParagraph()
			commitCustomDiv()
			continue
		}

		if (trimmedLine === '##') {
			commitParagraph()
			commitCustomDiv()
			continue
		}

		if (trimmedLine === '###') {
			commitParagraph()
			commitCustomDiv()
			continue
		}

		if (trimmedLine.startsWith('## ')) {
			if (title === null) {
				title = trimmedLine.substring(3).trim()
			}
			commitParagraph()
			commitCustomDiv()
			continue
		}

		if (trimmedLine.startsWith('### ')) {
			commitParagraph()
			commitCustomDiv()
			const subtitleText = trimmedLine.substring(4).trim()
			if (subtitleText.length > 0) {
				const item: ParsedContentItem = {
					kind: 'subtitle',
					text: subtitleText,
				}

				if (currentCustomDiv) {
					customDivChildren.push(item)
				} else {
					contentItems.push(item)
				}
			}
			continue
		}

		if (trimmedLine.startsWith('# ')) {
			commitParagraph()
			const paragraphText = trimmedLine.substring(2).trim()
			if (paragraphText.length > 0) {
				const item: ParsedContentItem = {
					kind: 'paragraph',
					text: paragraphText,
				}

				if (currentCustomDiv) {
					customDivChildren.push(item)
				} else {
					contentItems.push(item)
				}
			}
			continue
		}

		paragraphBuffer.push(trimmedLine)
	}

	commitParagraph()
	commitCustomDiv()

	return {
		title,
		content: contentItems,
	}
}

export { parseContentDocument }
export type { ParsedContent, ParsedContentItem }
