import Link from "next/link"

function EmploymentText() {

    return (
        <div className="absolute top-8 right-8 text-brand-black-1000 dark:text-brand-white-100 text-right h-6 flex flex-col gap-2">
            <span className="text-sm opacity-50 whitespace-nowrap">© {new Date().getFullYear()} Driek van der Meulen</span>
            <Link href="https://thirty-five.com" className="text-sm whitespace-nowrap">Software Engineer at 35® </Link>
            <Link href="https://www.zuyd.nl/opleidingen/communication-and-multimedia-design" className="text-sm whitespace-nowrap">CMD student at Zuyd Hogeschool</Link>
        </div>
    )
}

export default EmploymentText 