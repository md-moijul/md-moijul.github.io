<script setup lang="ts">
import NavigationPanel from "./components/NavigationPanel.vue";
import AboutSection from "./components/sections/AboutSection.vue";
import ProjectsSection from "./components/sections/ProjectsSection.vue";
import ContactSection from "./components/sections/ContactSection.vue";
</script>

<template>
	<div class="flex flex-col md:flex-row">
		<div class="md:w-1/2 md:h-screen md:flex md:items-center md:justify-center">
			<NavigationPanel />
		</div>

		<main class="md:w-1/2 md:h-screen overflow-y-auto">
			<div class="max-w-3xl p-8 sm:p-12 md:p-16 space-y-24 md:space-y-32">
				<AboutSection />
				<ProjectsSection />
				<ContactSection />
			</div>
		</main>
	</div>
</template>

<style scoped></style>
