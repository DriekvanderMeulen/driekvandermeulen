"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Location = {
    name: string
    timezone: string
}

const locations: Array<Location> = [
    { name: 'Maastricht', timezone: 'Europe/Amsterdam' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Maastricht', timezone: 'Europe/Amsterdam' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Maastricht', timezone: 'Europe/Amsterdam' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Maastricht', timezone: 'Europe/Amsterdam' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
]

function TimeDisplay() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [time, setTime] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const location = locations[currentIndex]
            const timeString = new Date().toLocaleTimeString('en-US', {
                timeZone: location.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                weekday: 'long',
            })
            setTime(timeString)
        }

        const timeInterval = setInterval(updateTime, 10000)
        const locationInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % locations.length)
        }, 10000)

        updateTime()

        return () => {
            clearInterval(timeInterval)
            clearInterval(locationInterval)
        }
    }, [currentIndex])

    return (
        <div className="absolute bottom-8 right-8 text-brand-black-1000 dark:text-brand-white-100 text-right overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{
                        x: -100,
                        width: 0,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        width: 'auto',
                        opacity: 1
                    }}
                    exit={{
                        x: 100,
                        width: 0,
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <div className="text-sm opacity-80 whitespace-nowrap">{locations[currentIndex].name}</div>
                    <div className="text-2xl font-bold whitespace-nowrap">{time}</div>
                    <motion.div
                        className="h-0.5 bg-brand-black-1000 dark:bg-brand-white-100 mt-2 opacity-30"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 10,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default TimeDisplay 