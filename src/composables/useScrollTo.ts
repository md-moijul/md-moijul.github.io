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
			// Use nextTick to ensure the page is rendered before scrolling
			await nextTick();
			if (lenisInstance.value) {
				lenisInstance.value.scrollTo(targetId, {
					offset,
					duration: 0.8, // Optimized duration
				});
			}
		} else {
			if (lenisInstance.value) {
				lenisInstance.value.scrollTo(targetId, {
					offset,
					duration: 0.8, // Optimized duration
				});
			}
		}
	};

	return {
		scrollToSection,
	};
}
