import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useThrottleFn } from "@vueuse/core";
import { lenisInstance } from "@/composables/useLenis";

export function useScrollSpy(sectionIds: string[]) {
    const activeSection = ref(sectionIds[0] || "about");
    const route = useRoute();

    const checkScrollPosition = (args?: any) => {
        const triggerPoint = window.innerHeight * 0.2;
        let current = activeSection.value;

        // Calculate which section is currently at the top
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerPoint) {
                    current = id;
                }
            }
        });

        // Precise bottom detection: only trigger if we are at the literal end
        if (args) {
            const { scroll, limit } = args;
            if (limit > 0 && scroll >= limit - 10) {
                current = sectionIds[sectionIds.length - 1]; // usually "contact"
            }
        } else if (lenisInstance.value) {
            const { scroll, limit } = lenisInstance.value;
            if (limit > 0 && scroll >= limit - 10) {
                current = sectionIds[sectionIds.length - 1];
            }
        }

        activeSection.value = current;
    };

    const handleScroll = useThrottleFn(checkScrollPosition, 100);

    onMounted(() => {
        if (lenisInstance.value) {
            lenisInstance.value.on("scroll", handleScroll);
            // Initial check
            handleScroll();
        }
    });

    // Watch for lenisInstance initialization and route changes
    watch(
        [lenisInstance, () => route.path],
        ([newInstance], [oldInstance]) => {
            if (oldInstance && oldInstance !== newInstance) {
                oldInstance.off("scroll", handleScroll);
            }
            if (newInstance) {
                newInstance.on("scroll", handleScroll);
                nextTick(() => handleScroll());
            }
        },
        { immediate: true },
    );

    onUnmounted(() => {
        if (lenisInstance.value) {
            lenisInstance.value.off("scroll", handleScroll);
        }
    });

    return {
        activeSection,
        checkScroll: handleScroll,
    };
}
