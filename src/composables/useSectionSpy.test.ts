import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSectionSpy } from './useSectionSpy';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe('useSectionSpy', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize activeSection with the first spy section', () => {
        const TestComponent = defineComponent({
            setup() {
                const { activeSection } = useSectionSpy(['about', 'projects']);
                return { activeSection };
            },
            template: '<div></div>',
        });

        const wrapper = mount(TestComponent, { attachTo: document.body });
        expect(wrapper.vm.activeSection).toBe('about');
        wrapper.unmount();
    });
});
