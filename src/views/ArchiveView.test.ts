import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from '@/views/ArchiveView.vue';
import { type Project } from '@/assets/data';

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

// Mock Lenis instance
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
    const mountWithProps = (props = { projects: mockProjects }) => {
        return mount(ArchiveView, {
            props
        });
    };

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
        it('card container has fixed height on desktop', () => {
            const wrapper = mountWithProps();
            const card = wrapper.find('.w-full.max-w-6xl');
            expect(card.classes()).toContain('lg:h-[calc(100vh-6rem)]');
        });

        it('title section is sticky on desktop', () => {
            const wrapper = mountWithProps();
            const titleSection = wrapper.find('h1').element.closest('div');
            expect(titleSection?.classList).toContain('lg:sticky');
            expect(titleSection?.classList).toContain('lg:top-0');
            expect(titleSection?.classList).toContain('lg:z-30');
        });

        it('table headers are sticky and offset on desktop', () => {
            const wrapper = mountWithProps();
            const tableHeader = wrapper.find('.sticky.top-0');
            expect(tableHeader.classes()).toContain('lg:top-[var(--header-height,104px)]');
        });

        it('headers have refined visual styles', () => {
            const wrapper = mountWithProps();
            const titleSection = wrapper.find('h1').element.closest('div');
            const tableHeader = wrapper.find('.sticky.top-0');
            
            expect(titleSection?.classList).toContain('lg:bg-background/80');
            expect(titleSection?.classList).toContain('lg:backdrop-blur-md');
            
            expect(tableHeader.classes()).toContain('lg:bg-background/80');
            expect(tableHeader.classes()).toContain('backdrop-blur-md');
        });
    });

    describe('Expansion Logic', () => {
        it('truncates description and expands on click', async () => {
            const wrapper = mountWithProps();
            const descPara = wrapper.find('p');
            
            // Initial state: should have lg:line-clamp-3
            expect(descPara.classes()).toContain('lg:line-clamp-3');
            
            await descPara.trigger('click');
            // When expanded, it should NOT have lg:line-clamp-3
            expect(descPara.classes()).not.toContain('lg:line-clamp-3');
            expect(descPara.classes()).toContain('line-clamp-none');
            
            await descPara.trigger('click');
            // Back to initial state
            expect(descPara.classes()).toContain('lg:line-clamp-3');
        });

        it('tech stack has flex-wrap and max-height by default', () => {
            const wrapper = mountWithProps();
            const stackContainer = wrapper.find('.flex-1 .flex.gap-1\\.5');
            expect(stackContainer.exists()).toBe(true);
            expect(stackContainer.classes()).toContain('flex-wrap');
            expect(stackContainer.classes()).toContain('lg:max-h-[72px]');
            expect(stackContainer.classes()).toContain('overflow-hidden');
        });

        it('clicking project expands both description and tech stack', async () => {
            const wrapper = mountWithProps();
            const row = wrapper.find('.flex-1 .flex.flex-col.gap-4');
            const descPara = row.find('p');
            const stackContainer = row.find('.flex.gap-1\\.5');

            // Initial state
            expect(stackContainer.classes()).toContain('lg:max-h-[72px]');
            expect(descPara.classes()).toContain('lg:line-clamp-3');

            await descPara.trigger('click');

            // Expanded state
            expect(stackContainer.classes()).not.toContain('lg:max-h-[72px]');
            expect(stackContainer.classes()).toContain('lg:max-h-none');
            expect(descPara.classes()).not.toContain('lg:line-clamp-3');
        });
    });

    describe('Responsive Layout', () => {
        it('hides table headers on mobile and shows them on desktop', () => {
            const wrapper = mountWithProps();
            const header = wrapper.find('.sticky.top-0');
            expect(header.classes()).toContain('hidden');
            expect(header.classes()).toContain('lg:grid');
        });

        it('scroll container does not force horizontal scroll on mobile', () => {
            const wrapper = mountWithProps();
            const scrollContainer = wrapper.find('[data-lenis-prevent]');
            expect(scrollContainer.classes()).not.toContain('overflow-x-auto');
            expect(scrollContainer.classes()).toContain('lg:overflow-x-auto');
            
            const innerContainer = scrollContainer.find('.lg\\:min-w-\\[900px\\]');
            expect(innerContainer.exists()).toBe(true);
        });

        it('project rows use flex-col on mobile and grid on desktop', () => {
            const wrapper = mountWithProps();
            const row = wrapper.find('.flex-1 .flex.flex-col.gap-4');
            expect(row.classes()).toContain('flex');
            expect(row.classes()).toContain('flex-col');
            expect(row.classes()).toContain('lg:grid');
        });

        it('links are visible on mobile in the first line and desktop in the last column', () => {
            const wrapper = mountWithProps();
            const row = wrapper.find('.flex-1 .flex.flex-col.gap-4');
            const children = row.findAll(':scope > div');
            
            // Links should be in the first child (mobile view)
            const mobileLinks = children[0].find('a');
            expect(mobileLinks.exists()).toBe(true);
            
            // Links should also be in the last child (desktop view)
            const desktopLinks = children[children.length - 1];
            expect(desktopLinks.classes()).toContain('lg:flex');
            expect(desktopLinks.classes()).toContain('hidden');
            expect(desktopLinks.find('a').exists()).toBe(true);
        });

        it('ensures mobile safety: no fixed height on card', () => {
            const wrapper = mountWithProps();
            const card = wrapper.find('.w-full.max-w-6xl');
            const hClasses = card.classes().filter(c => c.startsWith('h-') && !c.startsWith('lg:'));
            expect(hClasses.length).toBe(0);
        });
    });

    describe('Sorting Logic', () => {
        it('sorts projects by date descending and puts projects without dates at the end', () => {
            const projectsWithDifferentDates: Project[] = [
                { name: 'Old Project', date: new Date('2022-01-01'), stack: [], desc: '' },
                { name: 'New Project', date: new Date('2024-01-01'), stack: [], desc: '' },
                { name: 'No Date Project', stack: [], desc: '' },
                { name: 'Middle Project', date: new Date('2023-01-01'), stack: [], desc: '' },
            ];
            
            const wrapper = mount(ArchiveView, {
                props: { projects: projectsWithDifferentDates }
            });

            const projectNames = wrapper.findAll('.font-bold.text-xl').map(el => el.text());
            
            expect(projectNames).toEqual([
                'New Project',
                'Middle Project',
                'Old Project',
                'No Date Project'
            ]);
        });

        it('maintains original order for projects with the same date', () => {
             const projectsWithSameDates: Project[] = [
                { name: 'Project A', date: new Date('2023-01-01'), stack: [], desc: '' },
                { name: 'Project B', date: new Date('2023-01-01'), stack: [], desc: '' },
            ];
            
            const wrapper = mount(ArchiveView, {
                props: { projects: projectsWithSameDates }
            });

            const projectNames = wrapper.findAll('.font-bold.text-xl').map(el => el.text());
            
            expect(projectNames).toEqual([
                'Project A',
                'Project B'
            ]);
        });
    });
});
