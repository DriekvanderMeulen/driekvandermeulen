import InstagramHovercard from './InstagramHovercard'
import LinkedInHovercard from './LinkedInHovercard'
import GitHubHovercard from './GitHubHovercard'

const Footer = () => {
    return (
        <div className="min-h-[30vh] bg-brand-white-dark dark:bg-brand-black-dark flex items-center relative">
            <div className="flex flex-col items-center space-y-4 px-8">
                <InstagramHovercard
                    link="https://instagram.com/yourprofile"
                    mockData="Instagram Profile Embed or Mock Data"
                />
                <LinkedInHovercard
                    link="https://linkedin.com/in/yourprofile"
                    mockData="LinkedIn Profile Embed or Mock Data"
                />
                <GitHubHovercard
                    link="https://github.com/driekvandermeulen"
                    username='driekvandermeulen'
                />
            </div>
        </div>
    )
}

export default Footer