import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStackFilter } from './useStackFilter';
import { reactive } from 'vue';

const mockPush = vi.fn();
const mockQuery = reactive<{ stack?: string | string[] }>({});

vi.mock('vue-router', () => ({
    useRouter: () => ({ push: mockPush }),
    useRoute: () => ({ query: mockQuery }),
}));

describe('useStackFilter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.keys(mockQuery).forEach(key => delete mockQuery[key as keyof typeof mockQuery]);
    });

    it('should identify if a stack is active', () => {
        mockQuery.stack = 'Vue,TypeScript';
        const { isStackActive, activeStacks } = useStackFilter();
        expect(isStackActive('Vue')).toBe(true);
        expect(isStackActive('TypeScript')).toBe(true);
        expect(isStackActive('Next.js')).toBe(false);
        expect(activeStacks.value).toEqual(['Vue', 'TypeScript']);
    });

    it('should identify active stacks when legacy array exists', () => {
        mockQuery.stack = ['Vue', 'Next.js'];
        const { isStackActive } = useStackFilter();
        expect(isStackActive('Vue')).toBe(true);
        expect(isStackActive('Next.js')).toBe(true);
        expect(isStackActive('React')).toBe(false);
    });

    it('should add stack to query when toggled and not present', () => {
        const { toggleStack } = useStackFilter();
        toggleStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Vue' }
        });
    });

    it('should append stack to existing query string when toggled', () => {
        mockQuery.stack = 'Vue';
        const { toggleStack } = useStackFilter();
        toggleStack('Next.js');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Vue,Next.js' }
        });
    });

    it('should normalize legacy array and append when toggled', () => {
        mockQuery.stack = ['Vue', 'TypeScript'];
        const { toggleStack } = useStackFilter();
        toggleStack('Next.js');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Vue,TypeScript,Next.js' }
        });
    });

    it('should remove stack from query string when toggled and already present', () => {
        mockQuery.stack = 'Vue,Next.js';
        const { toggleStack } = useStackFilter();
        toggleStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Next.js' }
        });
    });

    it('should remove stack from legacy array and convert to string when toggled', () => {
        mockQuery.stack = ['Vue', 'Next.js'];
        const { toggleStack } = useStackFilter();
        toggleStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Next.js' }
        });
    });

    it('should clear stack query when the last one is removed', () => {
        mockQuery.stack = 'Vue';
        const { toggleStack } = useStackFilter();
        toggleStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: {}
        });
    });

    it('should handle special characters correctly', () => {
        mockQuery.stack = 'C++,Vue';
        const { isStackActive, toggleStack } = useStackFilter();
        expect(isStackActive('C++')).toBe(true);
        
        toggleStack('C++');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Vue' }
        });
    });

    it('should add stack to query using addToStack', () => {
        const { addToStack } = useStackFilter();
        addToStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: 'Vue' }
        });
    });

    it('should remove stack from query using removeFromStack', () => {
        mockQuery.stack = 'Vue';
        const { removeFromStack } = useStackFilter();
        removeFromStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: {}
        });
    });
});
