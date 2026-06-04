import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationPanel from './NavigationPanel.vue';
import { lenisInstance } from '@/composables/useLenis';

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(function() {
    return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    };
});

const mockPush = vi.fn();
const mockRoute = { path: '/' };

// Mock vue-router
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: mockPush,
    })),
    useRoute: vi.fn(() => mockRoute),
    RouterLink: {
        template: '<a><slot /></a>',
    },
}));

// Mock Lenis instance
const lenisHandlers: Record<string, Function[]> = {};
vi.mock('@/composables/useLenis', () => ({
    useLenis: vi.fn(),
    lenisInstance: {
        value: {
            scrollTo: vi.fn(),
            on: vi.fn((event, handler) => {
                lenisHandlers[event] = lenisHandlers[event] || [];
                lenisHandlers[event].push(handler);
            }),
            off: vi.fn((event, handler) => {
                if (lenisHandlers[event]) {
                    lenisHandlers[event] = lenisHandlers[event].filter(h => h !== handler);
                }
            }),
            progress: 0,
        },
    },
}));

const triggerLenisScroll = (data: { scroll: number; limit: number }) => {
    if (lenisHandlers['scroll']) {
        lenisHandlers['scroll'].forEach(handler => handler(data));
    }
};

describe('NavigationPanel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        mockRoute.path = '/';
        // Clear handlers
        Object.keys(lenisHandlers).forEach(key => delete lenisHandlers[key]);
        
        // Mock getElementById and getBoundingClientRect
        document.getElementById = vi.fn().mockImplementation((id) => {
            return {
                id,
                getBoundingClientRect: () => ({
                    top: id === 'about' ? 0 : 2000, // Default off-screen
                })
            };
        });

        // Mock window.innerHeight
        vi.stubGlobal('innerHeight', 1000);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('should have "about" as the active section by default', () => {
        const wrapper = mount(NavigationPanel);
        const aboutLink = wrapper.find('a[href="#about"]');
        expect(aboutLink.classes()).toContain('active-link');
    });

    it('should update active section when scrolling past trigger point', async () => {
        const wrapper = mount(NavigationPanel);
        
        // Mock positions: 'experience' is now at 10% of viewport (trigger is 20%)
        document.getElementById = vi.fn().mockImplementation((id) => {
            const positions: Record<string, number> = {
                about: -500,
                experience: 100, // Inside trigger zone
                projects: 1500,
                contact: 2500
            };
            return {
                id,
                getBoundingClientRect: () => ({ top: positions[id] })
            };
        });

        triggerLenisScroll({ scroll: 1000, limit: 5000 });
        await wrapper.vm.$nextTick();

        const experienceLink = wrapper.find('a[href="#experience"]');
        expect(experienceLink.classes()).toContain('active-link');
    });

    it('should force "contact" active when at the bottom of the page', async () => {
        const wrapper = mount(NavigationPanel);
        
        // Mock positions where 'projects' is still at the top but we are at the end
        document.getElementById = vi.fn().mockImplementation((id) => {
            const positions: Record<string, number> = {
                about: -2000,
                experience: -1000,
                projects: 50, // Projects is at top
                contact: 600  // Contact is below but it's the end of page
            };
            return {
                id,
                getBoundingClientRect: () => ({ top: positions[id] })
            };
        });

        triggerLenisScroll({ scroll: 4995, limit: 5000 }); // Near bottom
        await wrapper.vm.$nextTick();

        const contactLink = wrapper.find('a[href="#contact"]');
        expect(contactLink.classes()).toContain('active-link');
    });

    it('should call lenis.scrollTo when a navigation link is clicked on the home page', async () => {
        const wrapper = mount(NavigationPanel);
        const aboutLink = wrapper.find('a[href="#about"]');
        
        await aboutLink.trigger('click');
        
        if (lenisInstance.value) {
            expect(lenisInstance.value.scrollTo).toHaveBeenCalledWith('#about', expect.any(Object));
        } else {
            throw new Error('lenisInstance.value is null');
        }
    });

    it('should redirect to home and then scroll when clicked from another page', async () => {
        // Change mock to simulate being on /archive
        mockRoute.path = '/archive';
        
        const wrapper = mount(NavigationPanel);
        const aboutLink = wrapper.find('a[href="#about"]');
        
        await aboutLink.trigger('click');
        
        expect(mockPush).toHaveBeenCalledWith('/');
        
        // Wait for nextTick/promises
        await wrapper.vm.$nextTick();
        
        if (lenisInstance.value) {
            expect(lenisInstance.value.scrollTo).toHaveBeenCalledWith('#about', expect.any(Object));
        } else {
            throw new Error('lenisInstance.value is null');
        }
    });
});
