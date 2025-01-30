declare module 'github-calendar' {
    export default function GitHubCalendar(
        element: string | HTMLElement,
        username: string,
        options?: {
            responsive?: boolean
            tooltips?: boolean
            global_stats?: boolean
        }
    ): Promise<void>;
} 