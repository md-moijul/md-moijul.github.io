import { onMounted, onUnmounted, ref } from 'vue';
import Lenis from 'lenis';

export const lenisInstance = ref<Lenis | null>(null);

export function useLenis() {
    const animate = (time: number) => {
        if (lenisInstance.value) {
            lenisInstance.value.raf(time);
            requestAnimationFrame(animate);
        }
    };

    onMounted(() => {
        const wrapperElement = document.querySelector('main');
        const contentElement = document.querySelector('#scroll-content');

        if (wrapperElement && contentElement) {
            lenisInstance.value = new Lenis({
                lerp: 0.1,
                smoothWheel: true,
                wrapper: wrapperElement,
                content: contentElement,
            });

            requestAnimationFrame(animate);
        }
    });

    onUnmounted(() => {
        if (lenisInstance.value) {
            lenisInstance.value.destroy();
            lenisInstance.value = null;
        }
    });
}