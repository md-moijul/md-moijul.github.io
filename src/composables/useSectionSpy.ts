import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useSectionSpy(sectionIds: string[], wrapperSelector: string = 'main') {
    const activeSection = ref(sectionIds[0] || "about");
    let observer: IntersectionObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intersectionHeights = new Map<string, number>();

    const checkScrollPosition = () => {
        if (!sectionIds.length) return;
        const main = document.querySelector(wrapperSelector);
        if (!main) return;
        
        const isAtBottom = Math.ceil(main.scrollTop) >= main.scrollHeight - main.clientHeight - 10;
        if (isAtBottom) {
            activeSection.value = sectionIds[sectionIds.length - 1];
        }
    };

    const setupObserver = () => {
        if (!sectionIds.length) return;

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
                const main = document.querySelector(wrapperSelector);
                if (main) {
                    isAtBottom = Math.ceil(main.scrollTop) >= main.scrollHeight - main.clientHeight - 10;
                }

                if (isAtBottom) {
                    activeSection.value = sectionIds[sectionIds.length - 1];
                } else if (maxHeight > 0) {
                    activeSection.value = maxId;
                }
            },
            {
                rootMargin: "0px 0px 0px 0px",
                // Threshold array [0, 0.05, 0.1, ..., 1]
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

    let scrollContainer: Element | null = null;

    onMounted(() => {
        nextTick(() => {
            setupObserver();
            scrollContainer = document.querySelector(wrapperSelector);
            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', checkScrollPosition, { passive: true });
                checkScrollPosition();
            }
        });
    });

    onUnmounted(() => {
        disconnectObserver();
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', checkScrollPosition);
        }
    });

    return {
        activeSection,
    };
}
