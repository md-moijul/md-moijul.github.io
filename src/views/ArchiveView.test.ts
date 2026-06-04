import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ArchiveView from './ArchiveView.vue';
import { projects } from '@/assets/data';

// Mock vue-router
vi.mock('vue-router', () => ({
    RouterLink: {
        template: '<a><slot /></a>',
    },
}));

describe('ArchiveView', () => {
    it('renders the "All Projects" heading', () => {
        const wrapper = mount(ArchiveView);
        expect(wrapper.find('h1').text()).toBe('All Projects');
    });

    it('renders a table with project names', () => {
        const wrapper = mount(ArchiveView);
        const table = wrapper.find('table');
        expect(table.exists()).toBe(true);

        projects.forEach(project => {
            expect(wrapper.text()).toContain(project.name);
        });
    });

    it('renders the correct columns', () => {
        const wrapper = mount(ArchiveView);
        const headers = wrapper.findAll('th').map(th => th.text());
        expect(headers).toContain('Year');
        expect(headers).toContain('Project');
        expect(headers).toContain('Stack');
        expect(headers).toContain('Links');
    });

    it('has a "Go Back" link that points to home', () => {
        const wrapper = mount(ArchiveView);
        const backLink = wrapper.find('a');
        expect(backLink.text()).toContain('Go Back');
        // In our mock, RouterLink renders as <a>
        expect(backLink.attributes('to')).toBe('/');
    });
});
