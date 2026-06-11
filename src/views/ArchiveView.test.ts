import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from '@/views/ArchiveView.vue';
import { type Project } from '@/assets/data';
import Lenis from 'lenis';

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

// Mock useLenis composable (for global instance if used)
vi.mock('@/composables/useLenis', () => ({
    lenisInstance: {
        value: {
            stop: vi.fn(),
            start: vi.fn(),
        },
    },
    useLenis: vi.fn(),
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

        it('initializes a local Lenis instance on mount', () => {
            mountWithProps();
            expect((Lenis as any)._mockConstructor).toHaveBeenCalled();
            const lenisArgs = (Lenis as any)._mockConstructor.mock.calls[0][0];
            expect(lenisArgs).toHaveProperty('wrapper');
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
            // In the component, the table header is the second sticky element if we count the title section
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
        it('sorts projects by date descending', () => {
            const projectsWithDifferentDates: Project[] = [
                { name: 'Old Project', date: new Date('2022-01-01'), stack: [], desc: '' },
                { name: 'New Project', date: new Date('2024-01-01'), stack: [], desc: '' },
                { name: 'No Date Project', stack: [], desc: '' },
            ];
            
            const wrapper = mount(ArchiveView, {
                props: { projects: projectsWithDifferentDates },
                global: { stubs: { RouterLink: true } }
            });

            const projectNames = wrapper.findAll('.font-bold.text-xl').map(el => el.text());
            expect(projectNames[0]).toBe('New Project');
            expect(projectNames[projectNames.length - 1]).toBe('No Date Project');
        });
    });
});