<script setup lang="ts">
import { experiences } from "../../assets/data";
</script>

<template>
	<section id="experience" class="min-h-[60vh] py-10">
		<h2 class="text-3xl font-bold mb-8">Experience</h2>
		<ul class="space-y-8 text-lg leading-relaxed">
			<li v-for="(experience, index) in experiences" :key="index">
				<h3 class="font-bold text-xl">
					{{ experience.jobTitle }} at
					<a :href="experience.url" target="_blank" class="text-blue-500 hover:underline">{{
						experience.company
					}}</a>
				</h3>
				<p class="text-sm text-gray-400">
					{{ experience.startDate.toLocaleDateString() }} -
					{{ experience.EndDate === "present" ? "Present" : experience.EndDate.toLocaleDateString() }} |
					{{ experience.location }}
				</p>
				<p class="mt-2">{{ experience.desc }}</p>
				<div class="mt-2 flex flex-wrap gap-2">
					<span
						v-for="tech in experience.stack"
						:key="tech"
						class="bg-gray-700 text-gray-300 px-2 py-1 text-sm rounded"
					>
						{{ tech }}
					</span>
				</div>
			</li>
		</ul>
	</section>
</template>

<style scoped>
section {
}
</style>
