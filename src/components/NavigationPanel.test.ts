import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationPanel from './NavigationPanel.vue';
import { lenisInstance } from '@/composables/useLenis';
import { ref } from 'vue';

const mockPush = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({ push: mockPush })),
    useRoute: vi.fn(() => ({ path: '/' })),
    RouterLink: { template: '<a><slot /></a>' },
}));

const mockActiveSection = ref('about');
vi.mock('@/composables/useScrollSpy', () => ({
    useScrollSpy: vi.fn(() => ({
        activeSection: mockActiveSection,
        checkScroll: vi.fn()
    }))
}));

vi.mock('@/composables/useLenis', () => ({
    useLenis: vi.fn(),
    lenisInstance: {
        value: {
            scrollTo: vi.fn(),
            on: vi.fn(),
            off: vi.fn(),
        },
    },
}));

describe('NavigationPanel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockActiveSection.value = 'about';
    });

    it('should have "about" as the active section by default', () => {
        const wrapper = mount(NavigationPanel);
        const aboutLink = wrapper.find('a[href="#about"]');
        expect(aboutLink.classes()).toContain('active-link');
    });

    it('should dynamically update active link classes based on useScrollSpy', async () => {
        const wrapper = mount(NavigationPanel);
        
        mockActiveSection.value = 'experience';
        await wrapper.vm.$nextTick();

        const experienceLink = wrapper.find('a[href="#experience"]');
        expect(experienceLink.classes()).toContain('active-link');
    });

    it('should call lenis.scrollTo when a navigation link is clicked', async () => {
        const wrapper = mount(NavigationPanel);
        const aboutLink = wrapper.find('a[href="#about"]');
        
        await aboutLink.trigger('click');
        
        expect(lenisInstance.value?.scrollTo).toHaveBeenCalledWith('#about', expect.any(Object));
    });
});
