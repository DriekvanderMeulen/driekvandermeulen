'use client'

import type { ToolUIPart } from 'ai'

import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
} from '@/components/ai-elements/tool'

const toolCall: ToolUIPart = {
	type: 'tool-api_request' as const,
	toolCallId: 'api_request_1',
	state: 'output-error' as const,
	input: {
		url: 'https://api.example.com/data',
		method: 'GET',
		headers: {
			Authorization: 'Bearer token123',
			'Content-Type': 'application/json',
		},
		timeout: 5000,
	},
	output: undefined,
	errorText:
		'Connection timeout: The request took longer than 5000ms to complete. Please check your network connection and try again.',
}

const Example = () => (
	<div style={{ height: '500px' }}>
		<Tool>
			<ToolHeader state={toolCall.state} type={toolCall.type} />
			<ToolContent>
				<ToolInput input={toolCall.input} />
				{toolCall.state === 'output-error' ? <ToolOutput errorText={toolCall.errorText} output={toolCall.output} /> : null}
			</ToolContent>
		</Tool>
	</div>
)

export default Example
