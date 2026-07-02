import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

const mockRoute = { path: '/' };

// Mock vue-router
vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => mockRoute),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
    })),
}));

// Mock Lenis composable
vi.mock('@/composables/useScrollController', () => ({
    useScrollController: vi.fn(),
    lenisInstance: {
        value: {
            scrollTo: vi.fn(),
            resize: vi.fn(),
            on: vi.fn(),
            off: vi.fn(),
        },
    },
}));

// Mock NavigationPanel
vi.mock('@/components/NavigationPanel.vue', () => ({
    default: {
        template: '<div id="nav-panel" />',
    },
}));

// Mock MobileNav
vi.mock('@/components/MobileNav.vue', () => ({
    default: {
        template: '<div id="mobile-nav" />',
    },
    __esModule: true,
    __isTeleport: false,
}));

describe('App.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should have h-screen on the main container for smooth scrolling on all pages', () => {
        mockRoute.path = '/';
        const wrapper = mount(App, {
            global: {
                stubs: {
                    RouterView: true
                }
            }
        });
        const main = wrapper.find('main');
        
        expect(main.classes()).toContain('h-screen');
    });

    it('should use w-full and h-screen on the archive page', () => {
        mockRoute.path = '/archive';
        const wrapper = mount(App, {
            global: {
                stubs: {
                    RouterView: true
                }
            }
        });
        const main = wrapper.find('main');
        
        expect(main.classes()).toContain('w-full');
        expect(main.classes()).toContain('h-screen');
    });
});
