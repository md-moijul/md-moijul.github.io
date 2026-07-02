import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsSection from './ProjectsSection.vue';
import * as stackFilterModule from '@/composables/useStackFilter';

import { ref, computed } from 'vue';

const mockToggleStack = vi.fn();
const mockActiveStacks = ref<string[]>([]);

vi.spyOn(stackFilterModule, 'useStackFilter').mockReturnValue({
    toggleStack: mockToggleStack,
    isStackActive: vi.fn(),
    activeStacks: computed(() => mockActiveStacks.value),
    addToStack: vi.fn(),
    removeFromStack: vi.fn()
});

describe('ProjectsSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockActiveStacks.value = [];
    });

    it('contains a link to the archive with the correct text', () => {
        const wrapper = mount(ProjectsSection, {
            props: {
                projects: []
            },
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a :to="to"><slot /></a>',
                        props: ['to']
                    }
                }
            }
        });
        const archiveLink = wrapper.find('a[to="/archive"]');
        expect(archiveLink.exists()).toBe(true);
        expect(archiveLink.text()).toBe('View Full Project Archive');
    });

    it('renders project stack badges with correct variant based on activeStacks', async () => {
        mockActiveStacks.value = ['Vue'];
        
        const wrapper = mount(ProjectsSection, {
            props: {
                projects: [{ name: 'Project 1', desc: 'desc', stack: ['Vue', 'React'] }]
            },
            global: {
                stubs: {
                    RouterLink: { template: '<a :to="to"><slot /></a>', props: ['to'] }
                }
            }
        });

        const badges = wrapper.findAllComponents({ name: 'Badge' });
        const vueBadge = badges[0];
        const reactBadge = badges[1];

        expect(vueBadge.text()).toBe('Vue');
        expect(vueBadge.props('variant')).toBe('sparkly');
        
        expect(reactBadge.text()).toBe('React');
        expect(reactBadge.props('variant')).toBe('default');
    });

    it('calls toggleStack when a badge is clicked', async () => {
        const wrapper = mount(ProjectsSection, {
            props: {
                projects: [{ name: 'Project 1', desc: 'desc', stack: ['Vue'] }]
            },
            global: {
                stubs: {
                    RouterLink: { template: '<a :to="to"><slot /></a>', props: ['to'] }
                }
            }
        });

        const badge = wrapper.findComponent({ name: 'Badge' });
        await badge.trigger('click');
        expect(mockToggleStack).toHaveBeenCalledWith('Vue');
    });
});
