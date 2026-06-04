<script setup lang="ts">
import NavigationPanel from "./components/NavigationPanel.vue";
import { useLenis } from "./composables/useLenis";

// Lenis smooth scrolling is enabled globally.
// Note: Transition to multi-page might require scroll reset logic in router or here.
useLenis();
</script>

<template>
	<div class="flex flex-col md:flex-row">
		<div class="md:w-1/2 md:h-screen md:flex md:items-center md:justify-center">
			<NavigationPanel />
		</div>

		<main class="md:w-1/2 md:h-screen overflow-y-auto scrollbar-hide">
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>
