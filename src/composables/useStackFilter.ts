import { useRouter, useRoute } from 'vue-router';

export function useStackFilter() {
    const router = useRouter();
    const route = useRoute();

    const isStackActive = (stackName: string): boolean => {
        const stackQuery = route.query.stack;
        if (!stackQuery) return false;
        
        if (Array.isArray(stackQuery)) {
            return stackQuery.includes(stackName);
        }
        
        return stackQuery === stackName;
    };

    const addToStack = (stackName: string) => {
        const stackQuery = route.query.stack;
        let newStack: string | string[] | undefined;

        if (!stackQuery) {
            newStack = stackName;
        } else if (Array.isArray(stackQuery)) {
            if (!stackQuery.includes(stackName)) {
                newStack = [...stackQuery, stackName];
            } else {
                newStack = stackQuery;
            }
        } else {
            if (stackQuery !== stackName) {
                newStack = [stackQuery as string, stackName];
            } else {
                newStack = stackQuery;
            }
        }

        const newQuery = { ...route.query };
        newQuery.stack = newStack;
        router.push({ query: newQuery });
    };

    const removeFromStack = (stackName: string) => {
        const stackQuery = route.query.stack;
        if (!stackQuery) return;

        let newStack: string | string[] | undefined;

        if (Array.isArray(stackQuery)) {
            newStack = stackQuery.filter(s => s !== stackName);
            if (newStack.length === 0) newStack = undefined;
        } else {
            if (stackQuery === stackName) {
                newStack = undefined;
            } else {
                newStack = stackQuery;
            }
        }

        const newQuery = { ...route.query };
        if (newStack === undefined) {
            delete newQuery.stack;
        } else {
            newQuery.stack = newStack;
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
        isStackActive,
        toggleStack,
        addToStack,
        removeFromStack
    };
}
