import Auth from '@/components/auth/page-auth';
import { env } from '@/env.mjs'

export default function Page() {
    return (
        <Auth>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
                <iframe
                    src={env.FIGMA_LINK}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allowFullScreen
                ></iframe>
            </div>
        </Auth>
    );
}