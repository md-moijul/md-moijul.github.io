import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '@/assets/data'

describe('ProjectCard', () => {
	it('renders project details correctly', () => {
		const project: Project = {
			name: 'Super App',
			desc: 'A really cool app.',
			stack: ['Vue', 'TypeScript']
		}
		
		const wrapper = mount(ProjectCard, {
			props: { project, activeStacks: [] }
		})
		
		expect(wrapper.text()).toContain('Super App')
		expect(wrapper.text()).toContain('A really cool app.')
	})

	it('renders stack badges when project has a stack', () => {
		const project: Project = {
			name: 'Super App',
			desc: 'A really cool app.',
			stack: ['Vue', 'TypeScript']
		}
		
		const wrapper = mount(ProjectCard, {
			props: { project, activeStacks: [] }
		})
		
		expect(wrapper.text()).toContain('Vue')
		expect(wrapper.text()).toContain('TypeScript')
	})

	it('emits toggle-stack when a badge is clicked', async () => {
		const project: Project = {
			name: 'Super App',
			desc: 'A really cool app.',
			stack: ['Vue', 'TypeScript']
		}
		
		const wrapper = mount(ProjectCard, {
			props: { project, activeStacks: [] }
		})
		
		const badges = wrapper.findAll('.cursor-pointer')
		await badges[0].trigger('click')
		
		expect(wrapper.emitted('toggle-stack')).toBeTruthy()
		expect(wrapper.emitted('toggle-stack')?.[0]).toEqual(['Vue'])
	})

	it('sets badge variant based on activeStacks prop', () => {
		const project: Project = {
			name: 'Super App',
			desc: 'A really cool app.',
			stack: ['Vue', 'TypeScript']
		}
		
		const wrapper = mount(ProjectCard, {
			props: { project, activeStacks: ['Vue'] }
		})
		
		// Use component finding to check props
		const badges = wrapper.findAllComponents({ name: 'Badge' })
		
		expect(badges[0].props('variant')).toBe('sparkly')
		expect(badges[1].props('variant')).toBe('default')
	})
})
