<script setup lang="ts">
import type { Experience } from "@/assets/data";
import ExperienceCard from "@/components/features/ExperienceCard.vue";

defineProps<{
	experiences: Experience[];
}>();
</script>

<template>
	<section id="experience" class="scroll-m-16 min-h-screen">
		<h2 class="text-xl font-bold uppercase tracking-widest text-primary mb-8">
			Experience
		</h2>
		<div class="space-y-6">
			<ExperienceCard v-for="(experience, index) in experiences" :key="index" :experience="experience" />
		</div>
	</section>
</template>
