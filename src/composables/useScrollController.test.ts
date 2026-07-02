import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollController, lenisInstance } from './useScrollController';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Lenis from 'lenis';

vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
    useRoute: vi.fn(),
}));

// Mock Lenis
vi.mock('lenis', () => {
    return {
        default: vi.fn().mockImplementation(function() {
            return {
                raf: vi.fn(),
                destroy: vi.fn(),
                scrollTo: vi.fn(),
                on: vi.fn(),
                off: vi.fn(),
            };
        }),
    };
});

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

describe('useScrollController - Global', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lenisInstance.value = null;
    });

    it('should initialize global lenis on main and #scroll-content when no target is provided', async () => {
        const TestComponent = defineComponent({
            setup() {
                useScrollController();
                return {};
            },
            template: '<main><div id="scroll-content">Content</div></main>',
        });

        const wrapper = mount(TestComponent, {
            attachTo: document.body,
        });

        await nextTick();
        
        expect(lenisInstance.value).not.toBeNull();
        expect(Lenis).toHaveBeenCalledWith(expect.objectContaining({
            wrapper: expect.any(Element),
            content: expect.any(Element),
        }));

        wrapper.unmount();
    });

});

describe('useScrollController - Local', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lenisInstance.value = null;
    });

    it('should initialize local lenis and not affect global instance', async () => {
        const TestComponent = defineComponent({
            setup() {
                const targetRef = ref(null);
                useScrollController({ target: targetRef });
                return { targetRef };
            },
            template: '<div ref="targetRef"><div>Content</div></div>',
        });

        const wrapper = mount(TestComponent, {
            attachTo: document.body,
        });

        await nextTick();
        
        // Global should remain null
        expect(lenisInstance.value).toBeNull();

        // Lenis should have been called for local
        expect(Lenis).toHaveBeenCalledWith(expect.objectContaining({
            wrapper: expect.any(Element),
            content: expect.any(Element),
        }));

        wrapper.unmount();
    });

    it('should destroy local lenis on unmount', async () => {
        const TestComponent = defineComponent({
            setup() {
                const targetRef = ref(null);
                useScrollController({ target: targetRef });
                return { targetRef };
            },
            template: '<div ref="targetRef"><div>Content</div></div>',
        });

        const wrapper = mount(TestComponent, {
            attachTo: document.body,
        });

        await nextTick();
        
        // Mocked Lenis instances
        const mockLenisConstructor = vi.mocked(Lenis);
        const mockedInstance = mockLenisConstructor.mock.results[0].value;
        
        wrapper.unmount();

        expect(mockedInstance.destroy).toHaveBeenCalled();
    });
});

describe('useScrollController - scrollToSection', () => {
    let mockPush: any;
    let mockRoute: any;
    let mockLenis: any;

    beforeEach(() => {
        vi.clearAllMocks();
        lenisInstance.value = null;

        mockPush = vi.fn().mockResolvedValue(undefined);
        mockRoute = { path: '/' };

        vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
        vi.mocked(useRoute).mockReturnValue(mockRoute as any);
        
        mockLenis = {
            scrollTo: vi.fn(),
            resize: vi.fn(),
            destroy: vi.fn(),
            raf: vi.fn(),
        };
        vi.mocked(Lenis).mockImplementation(() => mockLenis);
    });

    it('should scroll to section on home page', async () => {
        const { scrollToSection } = useScrollController();
        
        // Setup global instance
        lenisInstance.value = mockLenis;

        await scrollToSection('#projects');
        
        expect(mockPush).not.toHaveBeenCalled();
        expect(mockLenis.scrollTo).toHaveBeenCalledWith('#projects', expect.objectContaining({ duration: 0.8 }));
    });

    it('should navigate to home page then scroll when not on home page', async () => {
        mockRoute.path = '/archive';
        const { scrollToSection } = useScrollController();
        
        // Setup global instance
        lenisInstance.value = mockLenis;

        await scrollToSection('#experience');
        
        expect(mockPush).toHaveBeenCalledWith('/');
        // After push, it should have waited for nextTick and then scrolled
        expect(mockLenis.resize).toHaveBeenCalled();
        expect(mockLenis.scrollTo).toHaveBeenCalledWith('#experience', expect.objectContaining({ duration: 0.8, immediate: false }));
    });
});

describe('useScrollController - spySections', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lenisInstance.value = null;
    });

    it('should initialize activeSection with the first spy section', () => {
        const TestComponent = defineComponent({
            setup() {
                const { activeSection } = useScrollController({ spySections: ['about', 'projects'] });
                return { activeSection };
            },
            template: '<div></div>',
        });

        const wrapper = mount(TestComponent, { attachTo: document.body });
        expect(wrapper.vm.activeSection).toBe('about');
        wrapper.unmount();
    });
});
