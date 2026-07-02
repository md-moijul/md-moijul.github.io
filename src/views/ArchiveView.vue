<script setup lang="ts">
import { type Project } from "@/assets/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import { useScrollController } from "@/composables/useScrollController";
import { useStackFilter } from "@/composables/useStackFilter";
import ArchiveProjectRow from "@/components/features/ArchiveProjectRow.vue";
import { sortProjectsByStackAndDate } from "@/lib/domain/project";

const props = defineProps<{
	projects: Project[];
}>();

const { activeStacks } = useStackFilter();

const sortedProjects = computed(() => sortProjectsByStackAndDate(props.projects, activeStacks.value));

const scrollContainer = ref<HTMLElement | null>(null);

useScrollController(scrollContainer);
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
					<ArchiveProjectRow
						v-for="project in sortedProjects"
						:key="project.name"
						:project="project"
					/>
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
