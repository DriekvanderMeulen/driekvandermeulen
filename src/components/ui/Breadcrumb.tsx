'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)
    let accumulatedPath = ''

    return (
        <nav aria-label='Breadcrumb' className='text-sm'>
            <ul className='flex text-xl items-center space-x-2 text-brand-black-1000 dark:text-brand-white-100'>
                <li>
                    <Link href='/' className='hover:underline'>
                        driek.dev
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    accumulatedPath += `/${segment}`
                    return (
                        <li key={index} className='flex min-w-fit items-center'>
                            <span className='mx-1'>/</span>
                            <Link href={accumulatedPath.toLowerCase()} className='hover:underline'>
                                {segment}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumb 