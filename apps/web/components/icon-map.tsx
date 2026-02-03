import {
	Award,
	Briefcase,
	Code,
	FileText,
	Github,
	GraduationCap,
	Linkedin,
	Mail,
	Palette,
	Rocket,
	Server,
	Twitter,
	User,
	Users,
	Wrench,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	Award,
	Briefcase,
	Code,
	FileText,
	Github,
	GraduationCap,
	Linkedin,
	Mail,
	Palette,
	Rocket,
	Server,
	Twitter,
	User,
	Users,
	Wrench,
}

export function IconFromName({
	name,
	className,
}: {
	name: string
	className?: string
}) {
	const Icon = iconMap[name]
	if (!Icon) return null
	return <Icon className={className} />
}
