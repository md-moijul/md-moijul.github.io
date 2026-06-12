<script setup lang="ts">
import { type Project } from "@/assets/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
import { useStackFilter } from "@/composables/useStackFilter";

const props = defineProps<{
	projects: Project[];
}>();

const { isStackActive, toggleStack } = useStackFilter();

const sortedProjects = computed(() => {
	return [...props.projects].sort((a, b) => {
		if (!a.date && !b.date) return 0;
		if (!a.date) return 1;
		if (!b.date) return -1;
		return b.date.getTime() - a.date.getTime();
	});
});

const formatDate = (date?: Date) => {
	if (!date) return "—";
	return date.getFullYear();
};

const expandedProjects = ref<Set<string>>(new Set());
const toggleExpand = (name: string) => {
	if (expandedProjects.value.has(name)) {
		expandedProjects.value.delete(name);
	} else {
		expandedProjects.value.add(name);
	}
};

const scrollContainer = ref<HTMLElement | null>(null);
let localLenis: Lenis | null = null;

onMounted(() => {
	if (scrollContainer.value) {
		localLenis = new Lenis({
			wrapper: scrollContainer.value,
			content: scrollContainer.value.firstElementChild as HTMLElement,
			lerp: 0.1,
			smoothWheel: true,
		});

		const animate = (time: number) => {
			localLenis?.raf(time);
			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}
});

onUnmounted(() => {
	if (localLenis) {
		localLenis.destroy();
		localLenis = null;
	}
});
</script>

<template>
	<div
		class="w-full min-h-screen p-4 md:p-8 lg:p-12 flex flex-col items-center"
	>
		<div
			class="w-full max-w-6xl bg-black/20 border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl lg:h-[calc(100vh-6rem)]"
		>
			<!-- Modal Header Section -->
			<div
				class="p-6 md:p-8 border-b border-border flex justify-between items-center gap-4 bg-background/50 lg:bg-background/80 lg:backdrop-blur-md shrink-0 lg:sticky lg:top-0 lg:z-30"
			>
				<h1 class="text-3xl md:text-4xl font-bold tracking-tight">
					All Projects
				</h1>

				<Button
					as-child
					variant="ghost"
					class="group hover:text-primary transition-colors shrink-0"
				>
					<RouterLink to="/" class="flex items-center gap-2">
						<span class="font-medium">Go Back</span>
						<ArrowLeft
							class="w-4 h-4 order-first group-hover:-translate-x-1 transition-transform"
						/>
					</RouterLink>
				</Button>
			</div>

			<!-- Sticky Table Header -->
			<div
				class="sticky top-0 lg:top-0 z-20 hidden lg:grid lg:grid-cols-[100px_2fr_4fr_3fr_120px] px-6 py-4 bg-white/20 lg:bg-background/80 backdrop-blur-md border-b border-border text-muted-foreground uppercase text-[10px] tracking-widest font-semibold shrink-0"
			>
				<div class="min-w-0">Year</div>
				<div class="min-w-0">Project</div>
				<div class="min-w-0">Description</div>
				<div class="min-w-0">Stack</div>
				<div class="min-w-0 text-right pr-4">Links</div>
			</div>

			<!-- Scrollable Container -->
			<div
				ref="scrollContainer"
				class="flex-1 overflow-y-auto lg:overflow-x-auto custom-scrollbar"
				data-lenis-prevent
			>
				<div
					class="flex flex-col h-full lg:min-w-[900px] divide-y divide-border/30"
				>
					<div
						v-for="project in sortedProjects"
						:key="project.name"
						class="flex flex-col gap-4 lg:grid lg:grid-cols-[100px_2fr_4fr_3fr_120px] px-6 py-8 lg:py-6 hover:bg-white/5 transition-colors group items-start"
					>
						<!-- Year & Mobile Links -->
						<div
							class="w-full flex justify-between items-center lg:block min-w-0 text-muted-foreground tabular-nums text-sm pt-1"
						>
							<span>{{ formatDate(project.date) }}</span>

							<!-- Mobile Links (Hidden on LG) -->
							<div class="flex lg:hidden items-center gap-4">
								<a
									v-if="project.sourceCode"
									:href="project.sourceCode"
									target="_blank"
									rel="noopener noreferrer"
									class="text-muted-foreground hover:text-primary transition-colors"
								>
									<Github class="w-4 h-4" />
								</a>
								<a
									v-if="project.liveUrl"
									:href="project.liveUrl"
									target="_blank"
									rel="noopener noreferrer"
									class="text-muted-foreground hover:text-primary transition-colors"
								>
									<ExternalLink class="w-4 h-4" />
								</a>
							</div>
						</div>

						<!-- Project Name -->
						<div class="min-w-0 pr-4">
							<span
								class="font-bold text-xl lg:text-base text-primary group-hover:text-primary/90 block break-normal"
								:title="project.name"
								>{{ project.name }}</span
							>
						</div>

						<!-- Description -->
						<div class="min-w-0 pr-8 text-muted-foreground text-sm">
							<p
								class="transition-all duration-300 cursor-pointer lg:hover:text-foreground"
								:class="
									expandedProjects.has(project.name)
										? 'line-clamp-none'
										: 'line-clamp-none lg:line-clamp-3'
								"
								@click="toggleExpand(project.name)"
							>
								{{ project.desc }}
							</p>
						</div>

						<!-- Stack -->
						<div class="min-w-0 pr-4 overflow-hidden">
							<div
								class="flex gap-1.5 transition-all duration-300 flex-wrap overflow-hidden"
								:class="
									expandedProjects.has(project.name)
										? 'lg:max-h-none'
										: 'lg:max-h-[72px]'
								"
							>
								<Badge
									v-for="tech in project.stack"
									:key="tech"
									class="text-xs py-0 px-2 whitespace-nowrap shrink-0 cursor-pointer"
									:variant="isStackActive(tech) ? 'sparkly' : 'default'"
									@click="toggleStack(tech)"
								>
									{{ tech }}
								</Badge>
							</div>
						</div>

						<!-- Desktop Links (Hidden on Mobile) -->
						<div
							class="min-w-0 hidden lg:flex items-center justify-end gap-3 pr-4"
						>
							<a
								v-if="project.sourceCode"
								:href="project.sourceCode"
								target="_blank"
								rel="noopener noreferrer"
								class="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
							>
								<Github
									class="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
								/>
							</a>
							<a
								v-if="project.liveUrl"
								:href="project.liveUrl"
								target="_blank"
								rel="noopener noreferrer"
								class="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
							>
								<ExternalLink
									class="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: var(--border) transparent;
	/* Ensures alignment remains even when vertical scrollbar appears */
	scrollbar-gutter: stable;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background-color: var(--border);
	border-radius: 10px;
}
</style>
tyle>
