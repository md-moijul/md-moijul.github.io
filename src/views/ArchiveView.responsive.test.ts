import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from '@/views/ArchiveView.vue';

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

// Mock projects data
vi.mock('@/assets/data', () => ({
    projects: [
        {
            name: 'Test Project',
            desc: 'Test Description',
            date: new Date('2024-01-01'),
            stack: ['Vue', 'Vitest'],
            sourceCode: 'https://github.com',
            liveUrl: 'https://example.com'
        }
    ]
}));

describe('ArchiveView Responsive Layout', () => {
    it('hides table headers on mobile and shows them on desktop', () => {
        const wrapper = mount(ArchiveView);
        const header = wrapper.find('.sticky.top-0');
        expect(header.classes()).toContain('hidden');
        expect(header.classes()).toContain('lg:grid');
    });

    it('scroll container does not force horizontal scroll on mobile', () => {
        const wrapper = mount(ArchiveView);
        const scrollContainer = wrapper.find('[data-lenis-prevent]');
        expect(scrollContainer.classes()).not.toContain('overflow-x-auto');
        expect(scrollContainer.classes()).toContain('lg:overflow-x-auto');
        
        const innerContainer = scrollContainer.find('.table-container');
        expect(innerContainer.classes()).not.toContain('min-w-[900px]');
        expect(innerContainer.classes()).toContain('lg:min-w-[900px]');
    });

    it('project rows use flex-col on mobile and grid on desktop', () => {
        const wrapper = mount(ArchiveView);
        const rows = wrapper.findAll('.mask-top > div');
        if (rows.length > 0) {
            const row = rows[0];
            expect(row.classes()).toContain('flex');
            expect(row.classes()).toContain('flex-col');
            expect(row.classes()).toContain('lg:grid');
        }
    });

    it('project row has the correct mobile hierarchy', () => {
        const wrapper = mount(ArchiveView);
        const rows = wrapper.findAll('.mask-top > div');
        if (rows.length > 0) {
            const row = rows[0];
            const children = row.findAll(':scope > div');
            
            // 1st child: Year & Links container (on mobile)
            expect(children[0].classes()).toContain('flex');
            expect(children[0].classes()).toContain('justify-between');
            
            // 2nd child: Project Name
            expect(children[1].find('.font-bold').exists()).toBe(true);
            
            // 3rd child: Description
            expect(children[2].classes()).not.toContain('hidden');
            
            // 4th child: Tech Stack
            expect(children[3].findComponent({ name: 'Badge' }).exists()).toBe(true);
        }
    });

    it('links are visible on mobile in the first line and desktop in the last column', () => {
        const wrapper = mount(ArchiveView);
        const rows = wrapper.findAll('.mask-top > div');
        if (rows.length > 0) {
            const row = rows[0];
            const children = row.findAll(':scope > div');
            
            // Links should be in the first child (mobile view)
            const mobileLinks = children[0].find('a');
            expect(mobileLinks.exists()).toBe(true);
            
            // Links should also be in the last child (desktop view)
            const desktopLinks = children[children.length - 1];
            expect(desktopLinks.classes()).toContain('lg:flex');
            expect(desktopLinks.classes()).toContain('hidden');
            expect(desktopLinks.find('a').exists()).toBe(true);
        }
    });
});
