import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BackgroundBlobs from './BackgroundBlobs.vue'

describe('BackgroundBlobs', () => {
  it('renders CSS background blobs correctly', () => {
    const wrapper = mount(BackgroundBlobs)
    expect(wrapper.find('div.background-blobs').exists()).toBe(true)
    expect(wrapper.findAll('.blob').length).toBe(4)
    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
