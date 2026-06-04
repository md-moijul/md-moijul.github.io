import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLenis, lenisInstance } from './useLenis';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';

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

const TestComponent = defineComponent({
    setup() {
        useLenis();
        return {};
    },
    template: '<main><div id="scroll-content">Content</div></main>',
});

describe('useLenis', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize lenis and expose the instance', async () => {
        const wrapper = mount(TestComponent, {
            attachTo: document.body,
        });

        await nextTick();
        
        expect(lenisInstance.value).toBeDefined();
        wrapper.unmount();
    });
});
