import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveProjectRow from './ArchiveProjectRow.vue';
import { type Project } from '@/assets/data';

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
    const mountWithProject = (project = mockProject, activeStacks: string[] = []) => {
        return mount(ArchiveProjectRow, {
            props: { project, activeStacks }
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

    it('renders project stack badges with correct variant based on activeStacks prop', () => {
        const wrapper = mountWithProject(mockProject, ['Vue']);
        const badges = wrapper.findAllComponents({ name: 'Badge' });
        
        expect(badges.length).toBe(2);
        
        expect(badges[0].text()).toBe('Vue');
        expect(badges[0].props('variant')).toBe('sparkly');
        
        expect(badges[1].text()).toBe('Vitest');
        expect(badges[1].props('variant')).toBe('default');
    });

    it('emits toggle-stack when a badge is clicked', async () => {
        const wrapper = mountWithProject();
        const badges = wrapper.findAllComponents({ name: 'Badge' });
        
        await badges[0].trigger('click');
        expect(wrapper.emitted('toggle-stack')).toBeTruthy();
        expect(wrapper.emitted('toggle-stack')?.[0]).toEqual(['Vue']);
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
