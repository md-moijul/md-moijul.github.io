import { onMounted, onUnmounted, ref, type Ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Lenis from 'lenis';

export const lenisInstance = ref<Lenis | null>(null);

export function useScrollController(options: { target?: Ref<HTMLElement | null> } = {}) {
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
                    // Global lenis initialized
                }
            });
        }
    });

    onUnmounted(() => {
        if (target) {
            if (localLenis.value && isCreator) {
                localLenis.value.destroy();
                localLenis.value = null;
            }
        } else if (lenisInstance.value) {
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
                
                const tryScroll = (attempts = 0) => {
                    if (document.querySelector(targetId)) {
                        lenisInstance.value?.resize();
                        lenisInstance.value?.scrollTo(targetId, {
                            offset,
                            duration: 0.8,
                            immediate: false, // Ensure it's a smooth scroll
                        });
                    } else if (attempts < 20) {
                        setTimeout(() => tryScroll(attempts + 1), 50);
                    }
                };
                tryScroll();
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
    };
}
