<script setup lang="ts">
import NavigationPanel from "./components/NavigationPanel.vue";
import AboutSection from "./components/sections/AboutSection.vue";
import ProjectsSection from "./components/sections/ProjectsSection.vue";
import ContactSection from "./components/sections/ContactSection.vue";
import ExperienceSection from "./components/sections/ExperienceSection.vue";
</script>

<template>
	<div class="flex flex-col md:flex-row">
		<div class="md:w-1/2 md:h-screen md:flex md:items-center md:justify-center">
			<NavigationPanel />
		</div>

		<main class="md:w-1/2 md:h-screen overflow-y-auto scrollbar-hide">
			<div class="max-w-3xl px-8 sm:px-12 md:px-16 space-y-24 md:space-y-32">
				<AboutSection class=" pt-8 sm:pt-12 md:pt-16 "/>
				<ExperienceSection />
				<ProjectsSection />
				<ContactSection class=" pb-8 sm:pb-12 md:pb-16 "/>
			</div>
		</main>
	</div>
</template>

<style scoped></style>
