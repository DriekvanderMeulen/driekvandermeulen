import React, { JSX } from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="mx-48 pt-48 bg-brand-white-100 dark:bg-brand-black-900 min-h-[70vh]">
            {children}
        </div>
    )
}
