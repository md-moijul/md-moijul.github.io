import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { useSmoothScroll, lenisInstance } from './useSmoothScroll';

vi.mock('lenis', () => {
    class MockLenis {
        raf = vi.fn();
        destroy = vi.fn();
        scrollTo = vi.fn();
    }
    return { default: MockLenis };
});

describe('useSmoothScroll', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        lenisInstance.value = null; // reset global lenis
    });

    it('returns lenis instance and scrollToSection function', () => {
        const TestComponent = defineComponent({
            setup() {
                return useSmoothScroll();
            },
            template: '<div id="scroll-content"></div>'
        });

        const wrapper = mount(TestComponent);
        expect(wrapper.vm.scrollToSection).toBeTypeOf('function');
        wrapper.unmount();
    });

    it('scrollToSection calls lenisInstance.scrollTo', async () => {
        const mockScrollTo = vi.fn();
        lenisInstance.value = { scrollTo: mockScrollTo } as any;

        const TestComponent = defineComponent({
            setup() {
                return useSmoothScroll();
            },
            template: '<div></div>'
        });

        const wrapper = mount(TestComponent);
        await wrapper.vm.scrollToSection('test-id');

        expect(mockScrollTo).toHaveBeenCalledWith('#test-id', expect.any(Object));
        wrapper.unmount();
    });
});
