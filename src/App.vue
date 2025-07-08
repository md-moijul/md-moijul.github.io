<script setup lang="ts">
import NavigationPanel from "./components/NavigationPanel.vue";
import AboutSection from "./components/sections/AboutSection.vue";
import ExperienceSection from "./components/sections/ExperienceSection.vue";
import ProjectsSection from "./components/sections/ProjectsSection.vue";
</script>

<template>
	<div class="flex flex-col md:flex-row min-h-screen">
		<NavigationPanel />
		<main class="flex flex-1 overflow-y-auto h-screen">
			<div class="max-w-3xl mx-auto space-y-24 md:space-y-32">
				<AboutSection />
				<ExperienceSection />
				<ProjectsSection />
			</div>
		</main>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
