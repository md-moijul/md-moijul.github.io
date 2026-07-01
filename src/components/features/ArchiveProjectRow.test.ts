import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveProjectRow from './ArchiveProjectRow.vue';
import { type Project } from '@/assets/data';
import * as stackFilterModule from '@/composables/useStackFilter';
import { ref, computed } from 'vue';

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

const mockProject: Project = {
    name: 'Test Project',
    desc: 'Test Description',
    date: new Date('2024-01-01'),
    stack: ['Vue', 'Vitest'],
    sourceCode: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true
};

describe('ArchiveProjectRow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mountWithProject = (project = mockProject) => {
        return mount(ArchiveProjectRow, {
            props: { project }
        });
    };

    it('renders project name', () => {
        const wrapper = mountWithProject();
        expect(wrapper.text()).toContain('Test Project');
    });

    it('renders formatted date (year only)', () => {
        const wrapper = mountWithProject();
        expect(wrapper.text()).toContain('2024');
    });

    it('truncates description and expands on click', async () => {
        const wrapper = mountWithProject();
        const descPara = wrapper.find('p');
        expect(descPara.classes()).toContain('lg:line-clamp-3');
        
        await descPara.trigger('click');
        expect(descPara.classes()).toContain('line-clamp-none');
        expect(descPara.classes()).not.toContain('lg:line-clamp-3');
        
        await descPara.trigger('click');
        expect(descPara.classes()).toContain('lg:line-clamp-3');
    });

    it('renders project stack badges with correct variant based on isStackActive', () => {
        mockIsStackActive.mockImplementation((stack) => stack === 'Vue');
        const wrapper = mountWithProject();
        const badges = wrapper.findAll('[data-slot="badge"]');
        
        expect(badges.length).toBe(2);
        
        const vueBadge = badges[0];
        
        expect(vueBadge.text()).toBe('Vue');
        expect(vueBadge.classes()).toContain('overflow-hidden'); // From sparkly variant
        
        expect(mockIsStackActive).toHaveBeenCalledWith('Vue');
        expect(mockIsStackActive).toHaveBeenCalledWith('Vitest');
    });

    it('calls toggleStack when a badge is clicked', async () => {
        const wrapper = mountWithProject();
        const badge = wrapper.find('[data-slot="badge"]');
        await badge.trigger('click');
        expect(mockToggleStack).toHaveBeenCalledWith('Vue');
    });

    it('renders github and live links if provided', () => {
        const wrapper = mountWithProject();
        const links = wrapper.findAll('a');
        const githubLinks = links.filter(a => a.attributes('href') === 'https://github.com');
        const liveLinks = links.filter(a => a.attributes('href') === 'https://example.com');

        expect(githubLinks.length).toBe(2); // One mobile, one desktop
        expect(liveLinks.length).toBe(2);
    });
});
