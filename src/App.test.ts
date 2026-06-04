import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

const mockRoute = { path: '/' };

// Mock vue-router
vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => mockRoute),
}));

// Mock Lenis composable
vi.mock('@/composables/useLenis', () => ({
    useLenis: vi.fn(),
    lenisInstance: {
        value: {
            scrollTo: vi.fn(),
            resize: vi.fn(),
        },
    },
}));

// Mock NavigationPanel
vi.mock('@/components/NavigationPanel.vue', () => ({
    default: {
        template: '<div id="nav-panel" />',
    },
}));

describe('App.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should have h-screen on the main container for smooth scrolling on the home page', () => {
        mockRoute.path = '/';
        const wrapper = mount(App, {
            global: {
                stubs: {
                    RouterView: true
                }
            }
        });
        const main = wrapper.find('main');
        
        expect(main.classes()).toContain('md:h-screen');
        expect(main.classes()).not.toContain('min-h-screen');
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
        expect(main.classes()).toContain('md:h-screen');
    });
});
