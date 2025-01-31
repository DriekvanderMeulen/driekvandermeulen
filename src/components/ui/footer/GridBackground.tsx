"use client"
export default function GridBackground() {
    return (
        <div className="grid grid-cols-12 grid-rows-4 min-w-full min-h-[30vh] z-10">
            {Array.from({ length: 12 * 4 }).map((_, rowIndex) => {
                const randomNumber = Math.floor(Math.random() * 6) * 100
                return (
                    <div key={rowIndex} className={`grid grid-cols-3 grid-rows-2 z-10 bg-brand-white-${randomNumber} dark:bg-brand-black-${randomNumber}`}>
                        {Array.from({ length: 3 * 2 }).map((_, colIndex) => {
                            const randomNumber = Math.floor(Math.random() * 6) * 100
                            return (
                                <div key={colIndex} className={`bg-brand-white-${randomNumber} dark:bg-brand-black-${randomNumber}`} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}