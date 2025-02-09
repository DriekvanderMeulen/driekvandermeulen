import React from 'react'
import versionHistory from '@/data/version-history.json'

const page = () => {
    const sortedVersions = [...versionHistory.versions].sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    )
    const latestVersion = sortedVersions[0]

    const latestVersionWithHerobrine = {
        ...latestVersion,
        keyPoints: [...latestVersion.keyPoints, 'Removed Herobrine'],
    }

    return (
        <div className="bg-brand-white-100 dark:bg-brand-black-900 flex h-screen flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-brand-black-1000 dark:text-brand-white-100 text-2xl font-light">
                    Current version
                </h2>
                <div className="flex flex-col gap-2 border border-brand-black-200 dark:border-brand-white-800 rounded-lg p-4">
                    <h3 className="text-brand-black-1000 dark:text-brand-white-100 text-lg font-light">
                        Version {latestVersionWithHerobrine.version} - released on{' '}
                        {new Date(latestVersionWithHerobrine.releaseDate).toLocaleDateString(
                            'en-GB'
                        )}
                    </h3>
                    <ul className="list-disc list-inside text-brand-black-1000 dark:text-brand-white-100 text-sm font-light">
                        {latestVersionWithHerobrine.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-brand-black-1000 dark:text-brand-white-100 text-2xl font-light">
                    Version history
                </h2>
                <div className="flex flex-col gap-4">
                    {sortedVersions.map((version) => (
                        <div key={version.version} className="flex flex-col gap-2">
                            <h3 className="text-brand-black-1000 dark:text-brand-white-100 text-lg font-light">
                                Version {version.version} - released on{' '}
                                {new Date(version.releaseDate).toLocaleDateString('en-GB')}
                            </h3>
                            <ul className="list-disc list-inside text-brand-black-1000 dark:text-brand-white-100 text-sm font-light">
                                {version.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page