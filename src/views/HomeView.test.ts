import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeView from './HomeView.vue';
import { projects, experiences } from '@/assets/data';

// Mock components so we can easily test if they are rendered
vi.mock('@/components/sections/AboutSection.vue', () => ({
    default: {
        template: '<div id="about-section" />',
    },
    __esModule: true,
    __isTeleport: false,
}));
vi.mock('@/components/sections/ExperienceSection.vue', () => ({
    default: {
        template: '<div id="experience-section" />',
    },
    __esModule: true,
    __isTeleport: false,
}));
vi.mock('@/components/sections/ProjectsSection.vue', () => ({
    default: {
        template: '<div id="projects-section" />',
    },
    __esModule: true,
    __isTeleport: false,
}));
vi.mock('@/components/sections/ContactSection.vue', () => ({
    default: {
        template: '<div id="contact-section" />',
    },
    __esModule: true,
    __isTeleport: false,
}));

describe('HomeView.vue', () => {
    it('should load all sections asynchronously and render them', async () => {
        const wrapper = mount(HomeView);
        
        // Wait for async components to resolve
        await flushPromises();
        
        expect(wrapper.find('#about-section').exists()).toBe(true);
        expect(wrapper.find('#experience-section').exists()).toBe(true);
        expect(wrapper.find('#projects-section').exists()).toBe(true);
        expect(wrapper.find('#contact-section').exists()).toBe(true);
    });
});
