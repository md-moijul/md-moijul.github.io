import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollController, lenisInstance } from './useScrollController';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref } from 'vue';
import Lenis from 'lenis';

// Mock Lenis
vi.mock('lenis', () => {
    return {
        default: vi.fn().mockImplementation(function() {
            return {
                raf: vi.fn(),
                destroy: vi.fn(),
                scrollTo: vi.fn(),
            };
        }),
    };
});

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

    it('should destroy global lenis on unmount', async () => {
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
        const instance = lenisInstance.value;
        expect(instance).not.toBeNull();
        
        wrapper.unmount();
        
        expect(instance?.destroy).toHaveBeenCalled();
        expect(lenisInstance.value).toBeNull();
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
                useScrollController(targetRef);
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
                useScrollController(targetRef);
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
