import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollSpy } from './useScrollSpy';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

const mockRoute = { path: '/' };

let mockIntersectionObserverCallback: IntersectionObserverCallback | null = null;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
        mockIntersectionObserverCallback = callback;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
}


// Mock vue-router
vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => mockRoute),
}));

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
    useThrottleFn: (fn: any) => fn
}));

// Mock Lenis instance
const lenisHandlers: Record<string, Function[]> = {};
vi.mock('@/composables/useLenis', async () => {
    const { ref } = await import('vue');
    return {
        lenisInstance: ref({
            on: vi.fn((event, handler) => {
                lenisHandlers[event] = lenisHandlers[event] || [];
                lenisHandlers[event].push(handler);
            }),
            off: vi.fn((event, handler) => {
                if (lenisHandlers[event]) {
                    lenisHandlers[event] = lenisHandlers[event].filter((h: any) => h !== handler);
                }
            }),
        }),
    };
});

const triggerLenisScroll = (data: { scroll: number; limit: number }) => {
    if (lenisHandlers['scroll']) {
        lenisHandlers['scroll'].forEach(handler => handler(data));
    }
};

const TestComponent = defineComponent({
    props: ['sections'],
    setup(props) {
        const { activeSection, checkScroll } = useScrollSpy(props.sections);
        return { activeSection, checkScroll };
    },
    template: '<div></div>'
});

describe('useScrollSpy', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRoute.path = '/';
        Object.keys(lenisHandlers).forEach(key => delete lenisHandlers[key]);
        mockIntersectionObserverCallback = null;
        
        document.getElementById = vi.fn().mockImplementation((id) => {
            return { id };
        });

        vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
        vi.stubGlobal('innerHeight', 1000);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('initializes with the first section', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'contact'] } });
        expect(wrapper.vm.activeSection).toBe('about');
        expect(mockObserve).toHaveBeenCalled();
    });

    it('updates active section to the one with highest intersection height', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'experience', 'contact'] } });
        
        expect(mockIntersectionObserverCallback).toBeDefined();
        
        if (mockIntersectionObserverCallback) {
            // Trigger intersections with different heights
            mockIntersectionObserverCallback([
                {
                    isIntersecting: true,
                    intersectionRect: { height: 200 } as DOMRectReadOnly,
                    target: { id: 'about' } as any
                } as IntersectionObserverEntry,
                {
                    isIntersecting: true,
                    intersectionRect: { height: 800 } as DOMRectReadOnly,
                    target: { id: 'experience' } as any
                } as IntersectionObserverEntry
            ], {} as IntersectionObserver);
        }

        expect(wrapper.vm.activeSection).toBe('experience');

        // Now 'about' overtakes 'experience'
        if (mockIntersectionObserverCallback) {
            mockIntersectionObserverCallback([
                {
                    isIntersecting: true,
                    intersectionRect: { height: 900 } as DOMRectReadOnly,
                    target: { id: 'about' } as any
                } as IntersectionObserverEntry,
                {
                    isIntersecting: true,
                    intersectionRect: { height: 100 } as DOMRectReadOnly,
                    target: { id: 'experience' } as any
                } as IntersectionObserverEntry
            ], {} as IntersectionObserver);
        }
        
        expect(wrapper.vm.activeSection).toBe('about');
    });

    it('forces last section active when at bottom', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'experience', 'contact'] } });

        triggerLenisScroll({ scroll: 4995, limit: 5000 });
        expect(wrapper.vm.activeSection).toBe('contact');
    });

    it('disconnects observer on unmount', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'experience', 'contact'] } });
        wrapper.unmount();
        expect(mockDisconnect).toHaveBeenCalled();
    });
});