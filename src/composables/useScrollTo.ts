import { type Ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { lenisInstance } from "@/composables/useLenis";

export function useScrollTo(activeSection?: Ref<string>) {
	const router = useRouter();
	const route = useRoute();

	const scrollToSection = async (id: string, e?: Event) => {
		if (e) e.preventDefault();

		const targetId = id.startsWith("#") ? id : `#${id}`;

		if (activeSection) {
			activeSection.value = id;
		}

		// Calculate 2rem offset in pixels
		const rem =
			parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
		const offset = -2 * rem;

		if (route.path !== "/") {
			await router.push("/");
			
			// Wait for multiple ticks to ensure:
			// 1. The HomeView component is mounted and rendered.
			// 2. The App.vue watcher has completed its scrollTo(0) and resize().
			// 3. The DOM layout has stabilized.
			await nextTick();
			await nextTick();

			if (lenisInstance.value) {
				// Force a resize just in case the App.vue watcher hasn't finished or missed something
				lenisInstance.value.resize();
				
				lenisInstance.value.scrollTo(targetId, {
					offset,
					duration: 0.8,
					immediate: false, // Ensure it's a smooth scroll
				});
			}
		} else {
			if (lenisInstance.value) {
				lenisInstance.value.scrollTo(targetId, {
					offset,
					duration: 0.8,
				});
			}
		}
	};

	return {
		scrollToSection,
	};
}
