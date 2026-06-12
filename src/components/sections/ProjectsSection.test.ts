import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsSection from './ProjectsSection.vue';
import * as stackFilterModule from '@/composables/useStackFilter';

// Mock useStackFilter
const mockToggleStack = vi.fn();
const mockIsStackActive = vi.fn().mockReturnValue(false);

vi.spyOn(stackFilterModule, 'useStackFilter').mockReturnValue({
    toggleStack: mockToggleStack,
    isStackActive: mockIsStackActive,
    addToStack: vi.fn(),
    removeFromStack: vi.fn()
});

describe('ProjectsSection', () => {
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

    it('renders project stack badges with correct variant based on isStackActive', async () => {
        // Mock Vue active for this test
        mockIsStackActive.mockImplementation((stack) => stack === 'Vue');
        
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

        const badges = wrapper.findAll('[data-slot="badge"]');
        const vueBadge = badges[0];
        const reactBadge = badges[1];

        expect(vueBadge.text()).toBe('Vue');
        expect(vueBadge.classes()).toContain('overflow-hidden'); 
        expect(mockIsStackActive).toHaveBeenCalledWith('Vue');
        expect(mockIsStackActive).toHaveBeenCalledWith('React');
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

        const badge = wrapper.find('[data-slot="badge"]');
        await badge.trigger('click');
        expect(mockToggleStack).toHaveBeenCalledWith('Vue');
    });
});
