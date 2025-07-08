<script setup lang="ts">
import { projects } from "../../assets/data";
</script>

<template>
	<section id="projects" class="min-h-[60vh] py-10">
		<h2 class="text-3xl font-bold mb-8">Projects</h2>
		<div class="space-y-6 text-lg leading-relaxed">
			<article v-for="project in projects" :key="project.name" :id="project.name">
				<h3 class="text-xl font-bold">{{ project.name }}</h3>
				<p class="mt-2 text-base">{{ project.desc }}</p>

				<div class="mt-3 flex flex-wrap gap-2">
					<span
						v-for="tech in project.stack"
						:key="tech"
						class="bg-gray-700 text-gray-300 px-2 py-1 text-sm rounded-full"
					>
						{{ tech }}
					</span>
				</div>
			</article>
		</div>
	</section>
</template>

<style scoped>
section {
}
</style>
