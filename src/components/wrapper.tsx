import React, { JSX } from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="mx-48 mt-48">
            {children}
        </div>
    )
}
