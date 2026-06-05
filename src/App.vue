<script setup lang="ts">
import { watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import NavigationPanel from "@/components/NavigationPanel.vue";
import MobileNav from "@/components/MobileNav.vue";
import { useLenis, lenisInstance } from "@/composables/useLenis";

const route = useRoute();

// Lenis smooth scrolling is enabled globally.
useLenis();

// Reset scroll to top and resize Lenis when route changes
watch(() => route.path, async () => {
	if (lenisInstance.value) {
		lenisInstance.value.scrollTo(0, { immediate: true });
		// Wait for next tick to ensure DOM is rendered before resizing
		await nextTick();
		lenisInstance.value?.resize();
	}
});
</script>

<template>
	<div class="flex flex-col md:flex-row min-h-screen">
		<!-- Desktop Sidebar: Only visible on md and up -->
		<div
			v-if="route.path !== '/archive'"
			class="hidden md:flex md:w-1/2 md:h-screen md:items-center md:justify-center"
		>
			<NavigationPanel />
		</div>

		<!-- Main content area: Scrollable on all screens -->
		<main
			:class="[
				route.path === '/archive' ? 'w-full' : 'md:w-1/2',
				'h-screen overflow-y-auto scrollbar-hide',
			]"
		>
			<div id="scroll-content">
				<!-- Mobile Header: Only visible on mobile -->
				<div v-if="route.path !== '/archive'" class="md:hidden">
					<NavigationPanel />
				</div>
				<RouterView />
			</div>
		</main>

		<MobileNav />
	</div>
</template>

<style scoped></style>
