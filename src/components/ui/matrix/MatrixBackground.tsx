'use client'

import { useEffect, useRef } from 'react'

interface MatrixBackgroundProps {
    color?: string | Array<string>
    darkModeColor?: string | Array<string>
    charset?: string
    size?: number
    fps?: number
}

export default function MatrixBackground({
    color = ['#0066DB', '#18bf74'],
    darkModeColor = ['#0066DB', '#18bf74'],
    charset = '01',
    size = 25,
    fps = 60
}: MatrixBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let w: number, h: number, p: number[]
        const resize = () => {
            w = canvas.width = canvas.clientWidth
            h = canvas.height = canvas.clientHeight
            p = Array(Math.ceil(w / size)).fill(0)
        }

        const random = (items: string) => items[Math.floor(Math.random() * items.length)]

        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)'
            ctx.fillRect(0, 0, w, h)

            // Create gradient for characters
            const gradient = ctx.createLinearGradient(0, 0, w, h)
            const colors = Array.isArray(color) ? color : [color]
            colors.forEach((c, i) => {
                gradient.addColorStop(i / (colors.length - 1), c)
            })
            ctx.fillStyle = gradient

            ctx.font = size + 'px monospace'
            for (let i = 0; i < p.length; i++) {
                const v = p[i]
                ctx.fillText(random(charset), i * size, v)
                p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + size
            }
        }

        resize()
        window.addEventListener('resize', resize)

        const interval = setInterval(draw, 2000 / fps)

        return () => {
            window.removeEventListener('resize', resize)
            clearInterval(interval)
        }
    }, [color, darkModeColor, charset, size, fps])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full mix-blend-screen"
        />
    )
} 