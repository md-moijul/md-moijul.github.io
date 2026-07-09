<script setup lang="ts">
import type { Project } from "@/assets/data";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/features/ProjectCard.vue";
import { useStackFilter } from "@/composables/useStackFilter";

defineProps<{
	projects: Project[];
}>();

const { activeStacks, toggleStack } = useStackFilter();
</script>

<template>
	<section id="projects" class="scroll-m-20 min-h-screen">
		<h2 class="text-xl font-bold uppercase tracking-widest text-primary mb-8">
			Projects
		</h2>
		<div class="grid grid-cols-1 gap-6">
			<ProjectCard 
				v-for="project in projects" 
				:key="project.name" 
				:project="project"
				:activeStacks="activeStacks"
				@toggle-stack="toggleStack"
			/>
		</div>
		<div class="mt-8 flex">
			<RouterLink to="/archive">
				<Button variant="outline" class="bg-black/30 font-bold shadow-md shadow-white"
					>View Full Project Archive</Button
				>
			</RouterLink>
		</div>
	</section>
</template>

