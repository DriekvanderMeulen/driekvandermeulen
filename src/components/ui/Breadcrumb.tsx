'use client'
import { Link2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    // Do not render breadcrumbs if the page is the root
    if (pathname === '/') {
        return null
    }

    return (
        <div aria-label='Breadcrumbs' className='text-sm'>
            <ul className='flex text-lg font-extralight items-center pl-2 py-2 border-l-2 border-brand-black-1000 dark:border-brand-white-100 mb-24 text-brand-black-1000 dark:text-brand-white-100'>
                <li className='mr-1'>
                    <Link2Icon className='w-4 h-4' />
                </li>
                <li className='mr-2'>
                    Breadcrumb:
                </li>
                <li className='hover:underline'>
                    <Link href='/'>driek.dev</Link>
                </li>
                {segments.map((segment, index) => {
                    const path = `/${segments.slice(0, index + 1).join('/')}`
                    return (
                        <li key={index} className='flex min-w-fit items-center'>
                            <span className='mr-1'>/</span>
                            <Link href={path.toLowerCase()} className='hover:underline'>
                                {segment}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Breadcrumb 