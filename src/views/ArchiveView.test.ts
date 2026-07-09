import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from '@/views/ArchiveView.vue';
import { type Project } from '@/assets/data';

import { ref, computed } from 'vue';
import * as stackFilterModule from '@/composables/useStackFilter';
import { useScrollController } from '@/composables/useScrollController';

// Mock useStackFilter
const mockToggleStack = vi.fn();
const mockIsStackActive = vi.fn().mockReturnValue(false);
const mockActiveStacks = ref<string[]>([]);

vi.spyOn(stackFilterModule, 'useStackFilter').mockReturnValue({
    toggleStack: mockToggleStack,
    isStackActive: mockIsStackActive,
    activeStacks: computed(() => mockActiveStacks.value),
    addToStack: vi.fn(),
    removeFromStack: vi.fn()
});

// Mock Lenis class
vi.mock('lenis', () => {
    class MockLenis {
        destroy = vi.fn();
        raf = vi.fn();
        static _mockConstructor = vi.fn();
        constructor(args: any) {
            MockLenis._mockConstructor(args);
        }
    }
    return {
        default: MockLenis,
    };
});

// Mock vue-router
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn(),
    })),
    useRoute: vi.fn(() => ({
        path: '/archive',
    })),
    RouterLink: {
        template: '<a><slot /></a>',
    },
}));

// Mock useScrollController composable (for global instance if used)
vi.mock('@/composables/useScrollController', () => ({
    lenisInstance: {
        value: {
            stop: vi.fn(),
            start: vi.fn(),
        },
    },
    useScrollController: vi.fn(),
}));

const mockProjects: Project[] = [
    {
        name: 'Test Project',
        desc: 'Test Description',
        date: new Date('2024-01-01'),
        stack: ['Vue', 'Vitest'],
        sourceCode: 'https://github.com',
        liveUrl: 'https://example.com',
        featured: true
    }
];

describe('ArchiveView', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mountWithProps = (props = { projects: mockProjects }) => {
        return mount(ArchiveView, {
            props,
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        });
    };

    describe('Layout and Smooth Scroll', () => {
        it('has a fixed height card container on desktop', () => {
            const wrapper = mountWithProps();
            const card = wrapper.find('.w-full.max-w-6xl');
            expect(card.classes()).toContain('lg:h-[calc(100vh-6rem)]');
            expect(card.classes()).toContain('overflow-hidden');
        });

        it('has an internal scroll container with data-lenis-prevent', () => {
            const wrapper = mountWithProps();
            const scrollContainer = wrapper.find('[data-lenis-prevent]');
            expect(scrollContainer.exists()).toBe(true);
            expect(scrollContainer.classes()).toContain('overflow-y-auto');
        });

        it('initializes a local Lenis instance via useScrollController', () => {
            mountWithProps();
            expect(useScrollController).toHaveBeenCalled();
        });
    });

    describe('Basic Rendering', () => {
        it('renders as a standard page layout', () => {
            const wrapper = mountWithProps();
            expect(wrapper.classes()).toContain('p-4');
        });

        it('contains a container with max-width', () => {
            const wrapper = mountWithProps();
            const container = wrapper.find('.w-full.max-w-6xl');
            expect(container.exists()).toBe(true);
        });

        it('renders the "All Projects" heading', () => {
            const wrapper = mountWithProps();
            expect(wrapper.find('h1').text()).toBe('All Projects');
        });

        it('renders project names', () => {
            const wrapper = mountWithProps();
            mockProjects.forEach(project => {
                expect(wrapper.text()).toContain(project.name);
            });
        });

        it('has a "Go Back" button that points to home', () => {
            const wrapper = mountWithProps();
            const backButton = wrapper.findAll('a').find(el => el.text().includes('Go Back'));
            expect(backButton?.exists()).toBe(true);
            expect(backButton?.attributes('to')).toBe('/');
        });
    });

    describe('Sticky Headers and Styling', () => {
        it('title section is sticky on desktop', () => {
            const wrapper = mountWithProps();
            const titleSection = wrapper.find('h1').element.closest('div');
            expect(titleSection?.classList).toContain('lg:sticky');
            expect(titleSection?.classList).toContain('lg:top-0');
            expect(titleSection?.classList).toContain('lg:z-30');
        });

        it('table headers are sticky on desktop', () => {
            const wrapper = mountWithProps();
            const stickyElements = wrapper.findAll('.sticky');
            const targetHeader = stickyElements.find(el => el.text().includes('Year'));
            expect(targetHeader?.exists()).toBe(true);
            expect(targetHeader?.classes()).toContain('lg:top-0');
        });
    });

    describe('Expansion Logic', () => {
        it('truncates description and expands on click', async () => {
            const wrapper = mountWithProps();
            const descPara = wrapper.find('p');
            expect(descPara.classes()).toContain('lg:line-clamp-3');
            
            await descPara.trigger('click');
            expect(descPara.classes()).toContain('line-clamp-none');
            expect(descPara.classes()).not.toContain('lg:line-clamp-3');
            
            await descPara.trigger('click');
            expect(descPara.classes()).toContain('lg:line-clamp-3');
        });

        it('tech stack has flex-wrap and max-height by default', () => {
            const wrapper = mountWithProps();
            const stackContainer = wrapper.find('.flex.gap-1\\.5');
            expect(stackContainer.exists()).toBe(true);
            expect(stackContainer.classes()).toContain('flex-wrap');
            expect(stackContainer.classes()).toContain('lg:max-h-[72px]');
            expect(stackContainer.classes()).toContain('overflow-hidden');
        });
    });

    describe('Interactive Stack Badges', () => {
        it('renders project stack badges with correct variant based on activeStacks', () => {
            mockActiveStacks.value = ['Vue'];
            const wrapper = mountWithProps();
            
            // We use component finding
            const badges = wrapper.findAllComponents({ name: 'Badge' });
            
            const vueBadge = badges[0];
            const vitestBadge = badges[1];
            
            expect(vueBadge.text()).toBe('Vue');
            expect(vueBadge.props('variant')).toBe('sparkly');
            
            expect(vitestBadge.text()).toBe('Vitest');
            expect(vitestBadge.props('variant')).toBe('default');
        });

        it('calls toggleStack when a badge is clicked', async () => {
            const wrapper = mountWithProps();
            const badge = wrapper.findComponent({ name: 'Badge' });
            await badge.trigger('click');
            expect(mockToggleStack).toHaveBeenCalledWith('Vue');
        });
    });

    describe('Responsive Layout', () => {
        it('hides table headers on mobile and shows them on desktop', () => {
            const wrapper = mountWithProps();
            const stickyElements = wrapper.findAll('.sticky');
            const tableHeader = stickyElements.find(el => el.text().includes('Year'));
            expect(tableHeader?.classes()).toContain('hidden');
            expect(tableHeader?.classes()).toContain('lg:grid');
        });

        it('project rows use flex-col on mobile and grid on desktop', () => {
            const wrapper = mountWithProps();
            const row = wrapper.find('.flex.flex-col.gap-4.lg\\:grid');
            expect(row.classes()).toContain('flex');
            expect(row.classes()).toContain('flex-col');
            expect(row.classes()).toContain('lg:grid');
        });
    });

    describe('Sorting Logic', () => {
        it('sorts projects by date descending by default', () => {
            const projectsWithDifferentDates: Project[] = [
                { name: 'Old Project', date: new Date('2022-01-01'), stack: [], desc: '' },
                { name: 'New Project', date: new Date('2024-01-01'), stack: [], desc: '' },
                { name: 'No Date Project', stack: [], desc: '' },
            ];
            
            mockActiveStacks.value = [];
            const wrapper = mount(ArchiveView, {
                props: { projects: projectsWithDifferentDates },
                global: { stubs: { RouterLink: true } }
            });

            const projectNames = wrapper.findAll('.font-bold.text-xl').map(el => el.text());
            expect(projectNames[0]).toBe('New Project');
            expect(projectNames[1]).toBe('Old Project');
            expect(projectNames[projectNames.length - 1]).toBe('No Date Project');
        });

        it('moves matching projects to the top when a stack is active', () => {
            const projects: Project[] = [
                { name: 'Recent Non-Match', date: new Date('2024-01-01'), stack: ['React'], desc: '' },
                { name: 'Old Match', date: new Date('2022-01-01'), stack: ['Vue'], desc: '' },
                { name: 'Recent Match', date: new Date('2024-06-01'), stack: ['Vue', 'TypeScript'], desc: '' },
            ];

            mockActiveStacks.value = ['Vue'];
            const wrapper = mount(ArchiveView, {
                props: { projects },
                global: { stubs: { RouterLink: true } }
            });

            const projectNames = wrapper.findAll('.font-bold.text-xl').map(el => el.text());
            // Recent Match should be first (match + newer)
            // Old Match should be second (match + older)
            // Recent Non-Match should be last
            expect(projectNames[0]).toBe('Recent Match');
            expect(projectNames[1]).toBe('Old Match');
            expect(projectNames[2]).toBe('Recent Non-Match');
        });
    });
});
