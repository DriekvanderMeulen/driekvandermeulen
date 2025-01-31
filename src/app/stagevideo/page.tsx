import Auth from '@/components/auth/page-auth'
import ClientRedirect from '@/components/ClientRedirect'

export default function AuthenticatedPage() {
    return (
        <Auth>
            <ClientRedirect url="https://youtu.be/Dpnqa3WUUeI" />
        </Auth>
    )
}