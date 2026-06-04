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
vi.mock('@/composables/useLenis', () => ({
    useLenis: vi.fn(),
    lenisInstance: {
        value: {
            scrollTo: vi.fn(),
        },
    },
}));

describe('NavigationPanel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        mockRoute.path = '/';
    });

    afterEach(() => {
        vi.useRealTimers();
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
        
        // Wait for setTimeout
        vi.advanceTimersByTime(100);
        
        if (lenisInstance.value) {
            expect(lenisInstance.value.scrollTo).toHaveBeenCalledWith('#about', expect.any(Object));
        } else {
            throw new Error('lenisInstance.value is null');
        }
    });
});
