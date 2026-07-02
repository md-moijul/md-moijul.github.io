import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useThrottleFn } from "@vueuse/core";
import { lenisInstance } from "@/composables/useLenis";

export function useScrollSpy(sectionIds: string[]) {
    const activeSection = ref(sectionIds[0] || "about");
    const route = useRoute();

    let observer: IntersectionObserver | null = null;

    const checkScrollPosition = (args?: any) => {
        // Precise bottom detection: only trigger if we are at the literal end
        if (args) {
            const { scroll, limit } = args;
            if (limit > 0 && scroll >= limit - 10) {
                activeSection.value = sectionIds[sectionIds.length - 1]; // usually "contact"
            }
        } else if (lenisInstance.value) {
            const { scroll, limit } = lenisInstance.value;
            if (limit > 0 && scroll >= limit - 10) {
                activeSection.value = sectionIds[sectionIds.length - 1];
            }
        }
    };

    const handleScroll = useThrottleFn(checkScrollPosition, 100);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intersectionHeights = new Map<string, number>();

    const setupObserver = () => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    intersectionHeights.set(entry.target.id, entry.intersectionRect.height);
                });

                let maxHeight = 0;
                let maxId = activeSection.value;

                intersectionHeights.forEach((height, id) => {
                    if (height > maxHeight) {
                        maxHeight = height;
                        maxId = id;
                    }
                });

                let isAtBottom = false;
                if (lenisInstance.value) {
                    const { scroll, limit } = lenisInstance.value;
                    if (limit > 0 && scroll >= limit - 10) {
                        isAtBottom = true;
                    }
                }

                if (isAtBottom) {
                    activeSection.value = sectionIds[sectionIds.length - 1];
                } else if (maxHeight > 0) {
                    activeSection.value = maxId;
                }
            },
            {
                rootMargin: "0px 0px 0px 0px",
                // Fire callbacks continuously as visibility changes (every 5%)
                threshold: Array.from({ length: 21 }, (_, i) => i / 20),
            }
        );

        const tryObserve = () => {
            if (!observer) return;
            let allFound = true;
            sectionIds.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    observer?.observe(el);
                } else {
                    allFound = false;
                }
            });

            if (!allFound) {
                timeoutId = setTimeout(tryObserve, 100);
            }
        };

        tryObserve();
    };

    const disconnectObserver = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    };

    onMounted(() => {
        setupObserver();
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
                nextTick(() => {
                    handleScroll();
                    disconnectObserver();
                    setupObserver();
                });
            }
        },
        { immediate: true },
    );

    onUnmounted(() => {
        disconnectObserver();
        if (lenisInstance.value) {
            lenisInstance.value.off("scroll", handleScroll);
        }
    });

    return {
        activeSection,
        checkScroll: handleScroll,
    };
}
