import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

export function useStackFilter() {
    const router = useRouter();
    const route = useRoute();

    const activeStacks = computed((): string[] => {
        const stackQuery = route.query.stack;
        if (!stackQuery) return [];
        
        if (Array.isArray(stackQuery)) {
            // Normalize legacy array format
            return stackQuery.filter(Boolean) as string[];
        }
        
        return (stackQuery as string).split(',').map(s => s.trim()).filter(Boolean);
    });

    const isStackActive = (stackName: string): boolean => {
        return activeStacks.value.includes(stackName);
    };

    const addToStack = (stackName: string) => {
        const currentStack = activeStacks.value;
        if (!currentStack.includes(stackName)) {
            const newStack = [...currentStack, stackName].join(',');
            const newQuery = { ...route.query, stack: newStack };
            router.push({ query: newQuery });
        }
    };

    const removeFromStack = (stackName: string) => {
        const currentStack = activeStacks.value;
        const newStackArray = currentStack.filter(s => s !== stackName);
        
        const newQuery = { ...route.query };
        if (newStackArray.length === 0) {
            delete newQuery.stack;
        } else {
            newQuery.stack = newStackArray.join(',');
        }

        router.push({ query: newQuery });
    };

    const toggleStack = (stackName: string) => {
        if (isStackActive(stackName)) {
            removeFromStack(stackName);
        } else {
            addToStack(stackName);
        }
    };

    return {
        activeStacks,
        isStackActive,
        toggleStack,
        addToStack,
        removeFromStack
    };
}
