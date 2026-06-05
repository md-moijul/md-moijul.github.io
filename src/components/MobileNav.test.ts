import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MobileNav from './MobileNav.vue';
import { lenisInstance } from '@/composables/useLenis';
import { ref } from 'vue';

const mockPush = vi.fn();
const mockRoute = { path: '/' };

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({ push: mockPush })),
    useRoute: vi.fn(() => mockRoute),
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

describe('MobileNav', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockActiveSection.value = 'about';
        mockRoute.path = '/';
    });

    it('should be hidden on desktop (md:hidden class)', () => {
        const wrapper = mount(MobileNav);
        expect(wrapper.classes()).toContain('md:hidden');
    });

    it('should toggle menu when FAB is clicked', async () => {
        const wrapper = mount(MobileNav);
        const fab = wrapper.find('button[aria-label="Toggle Menu"]');
        
        expect(wrapper.find('nav').exists()).toBe(false);
        
        await fab.trigger('click');
        expect(wrapper.find('nav').exists()).toBe(true);
        
        await fab.trigger('click');
        expect(wrapper.find('nav').exists()).toBe(false);
    });

    it('should highlight the active section on Home page', async () => {
        const wrapper = mount(MobileNav);
        const fab = wrapper.find('button[aria-label="Toggle Menu"]');
        await fab.trigger('click');
        
        const aboutLink = wrapper.findAll('nav a').find(a => a.text().includes('about'));
        expect(aboutLink?.classes()).toContain('text-foreground');
        expect(aboutLink?.text()).toContain('[');
    });

    it('should not highlight sections on Archive page', async () => {
        mockRoute.path = '/archive';
        const wrapper = mount(MobileNav);
        const fab = wrapper.find('button[aria-label="Toggle Menu"]');
        await fab.trigger('click');
        
        const aboutLink = wrapper.findAll('nav a').find(a => a.text().includes('about'));
        expect(aboutLink?.classes()).not.toContain('text-foreground');
        expect(aboutLink?.text()).not.toContain('[');
    });

    it('should close menu and call lenis.scrollTo when a link is clicked', async () => {
        const wrapper = mount(MobileNav);
        const fab = wrapper.find('button[aria-label="Toggle Menu"]');
        await fab.trigger('click');
        
        const experienceLink = wrapper.findAll('nav a').find(a => a.text().includes('experience'));
        await experienceLink?.trigger('click');
        
        expect(wrapper.find('nav').exists()).toBe(false);
        expect(lenisInstance.value?.scrollTo).toHaveBeenCalledWith('#experience', expect.any(Object));
    });

    it('should remove border and shadow from FAB when menu is open', async () => {
        const wrapper = mount(MobileNav);
        const fab = wrapper.find('button[aria-label="Toggle Menu"]');
        
        // Initially should have border and shadow
        expect(fab.classes()).toContain('border');
        expect(fab.classes()).toContain('border-border');
        expect(fab.classes()).toContain('shadow-lg');
        
        await fab.trigger('click');
        
        // When open, should NOT have border-border and shadow-lg
        expect(fab.classes()).not.toContain('border-border');
        expect(fab.classes()).not.toContain('shadow-lg');
    });
});
