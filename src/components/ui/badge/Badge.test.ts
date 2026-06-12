import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Badge } from './index';

describe('Badge', () => {
    it('should render the sparkly variant', () => {
        const wrapper = mount(Badge, {
            props: {
                variant: 'sparkly' as any
            },
            slots: {
                default: 'Vue'
            }
        });
        
        // Ensure it doesn't just fallback to default or something
        // We'll check if the wrapper's class contains the base class we expect for sparkly
        expect(wrapper.classes()).toContain('relative');
        expect(wrapper.classes()).toContain('overflow-hidden');
    });
});
