import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceCard from './ExperienceCard.vue'
import type { Experience } from '@/assets/data'

describe('ExperienceCard', () => {
	it('renders experience details correctly', () => {
		const experience: Experience = {
			company: 'Acme Corp',
			location: 'Metropolis',
			url: 'https://acme.com',
			roles: [
				{
					title: 'Software Engineer',
					startDate: new Date('2020-01-01'),
					endDate: new Date('2021-01-01'),
				}
			],
			desc: ['Built cool stuff.', 'Fixed bugs.']
		}
		
		const wrapper = mount(ExperienceCard, {
			props: { experience }
		})
		
		expect(wrapper.text()).toContain('Acme Corp')
		expect(wrapper.text()).toContain('Metropolis')
		expect(wrapper.text()).toContain('Software Engineer')
		expect(wrapper.text()).toContain('Built cool stuff.')
	})
})
