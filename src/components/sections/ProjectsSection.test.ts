import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsSection from './ProjectsSection.vue';

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
});
