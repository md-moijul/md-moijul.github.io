<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import NavigationPanel from "@/components/NavigationPanel.vue";
import { useLenis, lenisInstance } from "@/composables/useLenis";

const route = useRoute();

// Lenis smooth scrolling is enabled globally.
useLenis();

// Reset scroll to top and resize Lenis when route changes
watch(() => route.path, () => {
	if (lenisInstance.value) {
		lenisInstance.value.scrollTo(0, { immediate: true });
		// Give it a moment to render before resizing
		setTimeout(() => {
			lenisInstance.value?.resize();
		}, 100);
	}
});
</script>

<template>
	<div class="flex flex-col md:flex-row min-h-screen">
		<div v-if="route.path !== '/archive'" class="md:w-1/2 md:h-screen md:flex md:items-center md:justify-center">
			<NavigationPanel />
		</div>

		<main :class="[route.path === '/archive' ? 'w-full' : 'md:w-1/2', 'md:h-screen overflow-y-auto scrollbar-hide']">
			<div id="scroll-content">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<style scoped></style>
