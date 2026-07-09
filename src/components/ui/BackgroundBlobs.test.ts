import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BackgroundBlobs from './BackgroundBlobs.vue'

describe('BackgroundBlobs', () => {
  it('renders CSS background blobs correctly', () => {
    const wrapper = mount(BackgroundBlobs)
    expect(wrapper.find('div.background-blobs').exists()).toBe(true)
    expect(wrapper.findAll('.blob').length).toBe(6)
    
    // Test that tuningMode false doesn't show tuning panel
    expect(wrapper.find('.tuning-panel').exists()).toBe(false)
  })

  it('renders noise overlay correctly', () => {
    const wrapper = mount(BackgroundBlobs)
    const noiseOverlay = wrapper.find('.noise-overlay')
    expect(noiseOverlay.exists()).toBe(true)
    
    // Check if it contains an svg with feTurbulence
    const filter = noiseOverlay.find('feTurbulence')
    expect(filter.exists()).toBe(true)
  })

  it('renders tuning controls when tuningMode is true', async () => {
    const wrapper = mount(BackgroundBlobs, {
      props: {
        tuningMode: true
      }
    })
    
    expect(wrapper.find('.tuning-panel').exists()).toBe(true)
    
    // Check for tab buttons
    const tabs = wrapper.findAll('.tuning-tabs button')
    expect(tabs.length).toBeGreaterThanOrEqual(3) // General, Noise, Blobs
    
    // Check for Log Config button
    expect(wrapper.find('button.log-config-btn').exists()).toBe(true)
  })
})
