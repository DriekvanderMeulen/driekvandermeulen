import { motion } from 'motion/react'
import Link from 'next/link'
import versionHistory from '@/data/version-history.json'

function VersionDisplay() {
    const latestVersion = [...versionHistory.versions].sort((a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    )[0]

    return (
        <Link href="/version" className="absolute left-1/2 top-8 translate-x-[-50%]">
            <motion.div
                className="text-sm tracking-tighter opacity-50 text-brand-black-1000 dark:text-brand-white-100"
            >
                {latestVersion.version}
            </motion.div>
        </Link>
    )
}

export default VersionDisplay 