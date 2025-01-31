import { motion } from 'motion/react'
import Link from 'next/link'
import versionHistory from '@/data/version-history.json'

function VersionDisplay() {
    const latestVersion = [...versionHistory.versions].sort((a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    )[0]

    return (
        <Link href="/version" className="absolute left-1/2 bottom-8 -translate-x-1/2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.05, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-[8rem] font-bold leading-] tracking-tighter text-brand-black-1000 dark:text-brand-white-100"
            >
                {latestVersion.version}
            </motion.div>
        </Link>
    )
}

export default VersionDisplay 