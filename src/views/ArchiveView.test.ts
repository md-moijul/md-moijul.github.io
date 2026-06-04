import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from '@/views/ArchiveView.vue';
import { projects } from '@/assets/data';
import { lenisInstance } from '@/composables/useLenis';

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

describe('ArchiveView', () => {
    it('renders as a standard page layout', () => {
        const wrapper = mount(ArchiveView);
        expect(wrapper.classes()).not.toContain('fixed');
        expect(wrapper.classes()).not.toContain('inset-0');
        expect(wrapper.classes()).not.toContain('z-[100]');
        expect(wrapper.classes()).toContain('p-4');
    });

    it('contains a container with max-width', () => {
        const wrapper = mount(ArchiveView);
        const container = wrapper.find('.w-full.max-w-6xl');
        expect(container.exists()).toBe(true);
    });

    it('renders the "All Projects" heading', () => {
        const wrapper = mount(ArchiveView);
        expect(wrapper.find('h1').text()).toBe('All Projects');
    });

    it('renders project names', () => {
        const wrapper = mount(ArchiveView);
        projects.forEach(project => {
            expect(wrapper.text()).toContain(project.name);
        });
    });

    it('renders the correct column headers', () => {
        const wrapper = mount(ArchiveView);
        const headers = wrapper.find('.sticky.top-0');
        expect(headers.text()).toContain('Year');
        expect(headers.text()).toContain('Project');
        expect(headers.text()).toContain('Description');
        expect(headers.text()).toContain('Stack');
        expect(headers.text()).toContain('Links');
    });

    it('Description column is hidden on small screens', () => {
        const wrapper = mount(ArchiveView);
        const descHeader = wrapper.findAll('.min-w-0').find(el => el.text() === 'Description');
        expect(descHeader?.classes()).toContain('hidden');
        expect(descHeader?.classes()).toContain('lg:block');
    });

    it('does NOT have navigation links to home sections', () => {
        const wrapper = mount(ArchiveView);
        const links = wrapper.findAll('nav a');
        expect(links.length).toBe(0);
    });

    it('has a "Go Back" button that points to home', () => {
        const wrapper = mount(ArchiveView);
        const backButton = wrapper.findAll('a').find(el => el.text().includes('Go Back'));
        expect(backButton?.exists()).toBe(true);
        expect(backButton?.attributes('to')).toBe('/');
    });

    it('uses minimalist icons for project links', () => {
        const wrapper = mount(ArchiveView);
        
        // Find a project that has both links in assets/data
        const projectWithLinks = projects.find(p => p.sourceCode && p.liveUrl);
        if (projectWithLinks) {
            const links = wrapper.findAll('a[target="_blank"]');
            expect(links.length).toBeGreaterThan(0);
        }
    });

    it('truncates description and expands on click', async () => {
        const wrapper = mount(ArchiveView);
        const descPara = wrapper.find('.hidden.lg\\:block p');
        
        expect(descPara.classes()).toContain('line-clamp-3');
        
        await descPara.trigger('click');
        expect(descPara.classes()).not.toContain('line-clamp-3');
        expect(descPara.classes()).toContain('line-clamp-none');
        
        await descPara.trigger('click');
        expect(descPara.classes()).toContain('line-clamp-3');
    });

    it('has a sticky header section for the whole table', () => {
        const wrapper = mount(ArchiveView);
        const header = wrapper.find('.sticky.top-0');
        expect(header.exists()).toBe(true);
        expect(header.classes()).toContain('z-20');
        expect(header.classes()).toContain('backdrop-blur-md');
    });
});
