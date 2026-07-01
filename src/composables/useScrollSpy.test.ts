import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollSpy } from './useScrollSpy';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

const mockRoute = { path: '/' };

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
        
        document.getElementById = vi.fn().mockImplementation((id) => {
            return {
                id,
                getBoundingClientRect: () => ({
                    top: id === 'about' ? 0 : 2000,
                })
            };
        });

        vi.stubGlobal('innerHeight', 1000);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('initializes with the first section', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'contact'] } });
        expect(wrapper.vm.activeSection).toBe('about');
    });

    it('updates active section when scrolling past trigger point', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'experience', 'contact'] } });
        
        document.getElementById = vi.fn().mockImplementation((id) => {
            const positions: Record<string, number> = {
                about: -500,
                experience: 100, // Inside trigger zone
                contact: 2500
            };
            return {
                id,
                getBoundingClientRect: () => ({ top: positions[id] })
            };
        });

        wrapper.vm.checkScroll();
        expect(wrapper.vm.activeSection).toBe('experience');
    });

    it('forces last section active when at bottom', () => {
        const wrapper = mount(TestComponent, { props: { sections: ['about', 'experience', 'contact'] } });
        
        document.getElementById = vi.fn().mockImplementation((id) => {
            const positions: Record<string, number> = {
                about: -2000,
                experience: -1000,
                contact: 600  // Not at top, but scroll limit reached
            };
            return {
                id,
                getBoundingClientRect: () => ({ top: positions[id] })
            };
        });

        triggerLenisScroll({ scroll: 4995, limit: 5000 });
        expect(wrapper.vm.activeSection).toBe('contact');
    });
});