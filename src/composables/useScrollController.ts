import { onMounted, onUnmounted, ref, type Ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Lenis from 'lenis';

export const lenisInstance = ref<Lenis | null>(null);

export function useScrollController(options: { target?: Ref<HTMLElement | null>, spySections?: string[] } = {}) {
    const target = options.target;
    const localLenis = ref<Lenis | null>(null);
    const router = useRouter();
    const route = useRoute();

    const animate = (time: number) => {
        if (target) {
            if (localLenis.value) {
                localLenis.value.raf(time);
                requestAnimationFrame(animate);
            }
        } else if (lenisInstance.value) {
            lenisInstance.value.raf(time);
            requestAnimationFrame(animate);
        }
    };

    const activeSection = ref(options.spySections?.[0] || "about");
    let observer: IntersectionObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intersectionHeights = new Map<string, number>();

    const checkScrollPosition = (args?: any) => {
        if (!options.spySections?.length) return;
        const sectionIds = options.spySections;
        
        if (args) {
            const { scroll, limit } = args;
            if (limit > 0 && scroll >= limit - 10) {
                activeSection.value = sectionIds[sectionIds.length - 1];
            }
        } else if (lenisInstance.value) {
            const { scroll, limit } = lenisInstance.value;
            if (limit > 0 && scroll >= limit - 10) {
                activeSection.value = sectionIds[sectionIds.length - 1];
            }
        }
    };

    const handleScroll = (args?: any) => checkScrollPosition(args); // We can throttle this if needed, or lenis handles it fast

    const setupObserver = () => {
        if (!options.spySections?.length) return;
        const sectionIds = options.spySections;

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

    let isCreator = false;

    onMounted(() => {
        if (target) {
            if (target.value && target.value.firstElementChild) {
                localLenis.value = new Lenis({
                    lerp: 0.1,
                    smoothWheel: true,
                    wrapper: target.value,
                    content: target.value.firstElementChild as HTMLElement,
                });
                requestAnimationFrame(animate);
                isCreator = true;
            }
        } else {
            nextTick(() => {
                if (!lenisInstance.value) {
                    const wrapperElement = document.querySelector('main');
                    const contentElement = document.querySelector('#scroll-content');

                    if (wrapperElement && contentElement) {
                        lenisInstance.value = new Lenis({
                            lerp: 0.15,
                            smoothWheel: true,
                            wrapper: wrapperElement,
                            content: contentElement as HTMLElement,
                        });

                        requestAnimationFrame(animate);
                        isCreator = true;
                    }
                }
                
                if (lenisInstance.value) {
                    lenisInstance.value.on("scroll", handleScroll);
                }
            });
        }

        if (options.spySections?.length) {
            nextTick(() => {
                setupObserver();
                handleScroll();
            });
        }
    });

    onUnmounted(() => {
        disconnectObserver();
        if (target) {
            if (localLenis.value && isCreator) {
                localLenis.value.destroy();
                localLenis.value = null;
            }
        } else if (lenisInstance.value) {
            lenisInstance.value.off("scroll", handleScroll);
            // Global lenis is tied to App.vue which never unmounts,
            // so we don't destroy it here even if this component created it.
        }
    });

    const scrollToSection = async (id: string, e?: Event) => {
        if (e) e.preventDefault();

        const targetId = id.startsWith("#") ? id : `#${id}`;

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
        lenis: target ? localLenis : lenisInstance,
        scrollToSection,
        activeSection,
    };
}
