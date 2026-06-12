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
        mockQuery.stack = 'Vue';
        const { isStackActive } = useStackFilter();
        expect(isStackActive('Vue')).toBe(true);
        expect(isStackActive('Next.js')).toBe(false);
    });

    it('should identify active stacks when multiple exist', () => {
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

    it('should append stack to existing query array when toggled', () => {
        mockQuery.stack = 'Vue';
        const { toggleStack } = useStackFilter();
        toggleStack('Next.js');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: ['Vue', 'Next.js'] }
        });
    });

    it('should remove stack from query when toggled and already present', () => {
        mockQuery.stack = ['Vue', 'Next.js'];
        const { toggleStack } = useStackFilter();
        toggleStack('Vue');
        expect(mockPush).toHaveBeenCalledWith({
            query: { stack: ['Next.js'] }
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
