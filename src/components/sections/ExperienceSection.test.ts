import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperienceSection from './ExperienceSection.vue';

describe('ExperienceSection', () => {
    it('renders the provided experience props', () => {
        const mockExperiences = [
            {
                company: 'Test Company',
                jobTitle: 'Test Title',
                desc: 'Test description',
                location: 'Test City',
                startDate: new Date('2023-01-01'),
                EndDate: 'present' as const,
                projects: ['Test Project']
            }
        ];

        const wrapper = mount(ExperienceSection, {
            props: {
                experiences: mockExperiences
            }
        });

        expect(wrapper.text()).toContain('Test Company');
        expect(wrapper.text()).toContain('Test Title');
        expect(wrapper.text()).toContain('Test description');
        expect(wrapper.text()).toContain('Test City');
        expect(wrapper.text()).toContain('Test_Project');
    });
});
