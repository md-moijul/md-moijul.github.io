import { type Project } from "@/assets/data";

export function sortProjectsByStackAndDate(projects: Project[], activeStacks: string[]): Project[] {
	return [...projects].sort((a, b) => {
		// Tier 1: Stack Match (Any match to top)
		const aHasMatch = a.stack.some((tech) => activeStacks.includes(tech));
		const bHasMatch = b.stack.some((tech) => activeStacks.includes(tech));

		if (aHasMatch && !bHasMatch) return -1;
		if (!aHasMatch && bHasMatch) return 1;

		// Tier 2: Date
		if (!a.date && !b.date) return 0;
		if (!a.date) return 1;
		if (!b.date) return -1;
		return b.date.getTime() - a.date.getTime();
	});
}
