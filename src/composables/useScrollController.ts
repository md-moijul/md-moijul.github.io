import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import Lenis from 'lenis';

export const lenisInstance = ref<Lenis | null>(null);

export function useScrollController(target?: Ref<HTMLElement | null>) {
    const localLenis = ref<Lenis | null>(null);

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
            }
        } else {
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
            }
        }
    });

    onUnmounted(() => {
        if (target) {
            if (localLenis.value) {
                localLenis.value.destroy();
                localLenis.value = null;
            }
        } else if (lenisInstance.value) {
            lenisInstance.value.destroy();
            lenisInstance.value = null;
        }
    });

    return target ? localLenis : lenisInstance;
}
