import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperienceSection from './ExperienceSection.vue';

describe('ExperienceSection', () => {
    it('renders the provided experience props with multiple roles', () => {
        const mockExperiences = [
            {
                company: 'Test Company',
                location: 'Test City',
                desc: ['Test paragraph 1', 'Test paragraph 2'],
                roles: [
                    {
                        title: 'Senior Developer',
                        startDate: new Date('2023-01-01'),
                        endDate: 'present'
                    },
                    {
                        title: 'Junior Developer',
                        startDate: new Date('2022-01-01'),
                        endDate: new Date('2022-12-31')
                    }
                ]
            }
        ] as const;

        const wrapper = mount(ExperienceSection, {
            props: {
                experiences: mockExperiences as any 
            }
        });

        expect(wrapper.text()).toContain('Test Company');
        expect(wrapper.text()).toContain('Test City');
        expect(wrapper.text()).toContain('Test paragraph 1');
        expect(wrapper.text()).toContain('Test paragraph 2');
        expect(wrapper.text()).toContain('Senior Developer');
        expect(wrapper.text()).toContain('Junior Developer');
    });
});
