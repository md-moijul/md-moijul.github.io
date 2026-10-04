import { vi } from 'vitest';

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
