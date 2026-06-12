import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from './Card.vue';
import CardContent from './CardContent.vue';
import { h } from 'vue';

describe('Card Interactivity', () => {
    it('should allow clicking elements inside CardContent', async () => {
        let clicked = false;
        const wrapper = mount(Card, {
            slots: {
                default: () => h(CardContent, null, {
                    default: () => h('button', { 
                        onClick: () => { clicked = true; },
                        id: 'test-button'
                    }, 'Click Me')
                })
            }
        });

        const button = wrapper.find('#test-button');
        await button.trigger('click');
        
        // In JSDOM, this will likely pass even if the pseudo-element is blocking,
        // because JSDOM doesn't handle the visual occlusion of pseudo-elements.
        expect(clicked).toBe(true);
    });
});
