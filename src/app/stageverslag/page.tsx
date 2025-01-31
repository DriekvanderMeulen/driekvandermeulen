import Auth from '@/components/auth/page-auth'
import ClientRedirect from '@/components/ClientRedirect'

export default function AuthenticatedPage() {
    return (
        <Auth>
            <ClientRedirect url="https://www.figma.com/deck/CNqpAKpyzslbS6jF6ZvPnn/Stageverslag-Driek?node-id=12002-315&t=scg8ESfeur90QUUv-1" />
        </Auth>
    )
}