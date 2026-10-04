import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationPanel from './NavigationPanel.vue';
import { Download } from 'lucide-vue-next';

import { ref } from 'vue';

const mockPush = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({ push: mockPush })),
    useRoute: vi.fn(() => ({ path: '/', query: {} })),
    RouterLink: { template: '<a><slot /></a>' },
}));

const mockActiveSection = ref('about');
const mockScrollToSection = vi.fn();

vi.mock('@/composables/useSectionSpy', () => ({
    useSectionSpy: vi.fn(() => ({
        activeSection: mockActiveSection,
    })),
}));

vi.mock('@/composables/useSmoothScroll', () => ({
    useSmoothScroll: vi.fn(() => ({
        scrollToSection: mockScrollToSection,
        lenis: { value: { resize: vi.fn() } }
    })),
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
        
        expect(mockScrollToSection).toHaveBeenCalledWith('about');
    });

    it('should render a download resume button with correct attributes', () => {
        const wrapper = mount(NavigationPanel);
        const resumeLink = wrapper.find('a[href="/resume.pdf"]');
        
        expect(resumeLink.exists()).toBe(true);
        expect(resumeLink.attributes('target')).toBe('_blank');
        expect(resumeLink.attributes('rel')).toBe('noopener noreferrer');
        expect(resumeLink.attributes('download')).toBe('Moijul-Islam-Resume.pdf');
        expect(resumeLink.text()).toContain('Resume');
        
        // Check for the Download icon component
        const icon = resumeLink.findComponent(Download);
        expect(icon.exists()).toBe(true);
    });
});
