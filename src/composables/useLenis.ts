import { onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';

export function useLenis() {
    let lenis: Lenis | null = null;

    const animate = (time: number) => {
        if (lenis) {
            lenis.raf(time);
            requestAnimationFrame(animate);
        }
    };

    onMounted(() => {
        const wrapperElement = document.querySelector('main');
        const contentElement = wrapperElement?.querySelector('div');

        if (wrapperElement && contentElement) {
            lenis = new Lenis({
                lerp: 0.1,
                smoothWheel: true,
                wrapper: wrapperElement,
                content: contentElement,
            });

            requestAnimationFrame(animate);
        }
    });

    onUnmounted(() => {
        if (lenis) {
            lenis.destroy();
            lenis = null;
        }
    });
}