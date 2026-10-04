import type { Directive } from 'vue'

const observer = new IntersectionObserver(
	(entries) => {
		const intersecting = entries.filter((entry) => entry.isIntersecting)

		intersecting.forEach((entry, index) => {
			const el = entry.target as HTMLElement
			const isStaggered = el.dataset.revealStagger === 'true'
			const baseDelay = parseInt(el.dataset.revealDelay || '0', 10)

			// If multiple elements intersect at once and have stagger enabled,
			// we add a 150ms delay multiplied by their index in the batch.
			const delay = baseDelay + (isStaggered ? index * 150 : 0)

			if (delay > 0) {
				setTimeout(() => {
					el.dataset.revealed = 'true'
				}, delay)
			} else {
				// Use requestAnimationFrame to ensure the initial DOM state is rendered
				// before setting revealed to true, ensuring the transition triggers.
				requestAnimationFrame(() => {
					el.dataset.revealed = 'true'
				})
			}

			// Stop observing once revealed so it only animates in once
			observer.unobserve(el)
		})
	},
	{
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters fully
	}
)

export const vReveal: Directive = {
	mounted(el, binding) {
		if (binding.value) {
			if (binding.value.stagger) el.dataset.revealStagger = 'true'
			if (binding.value.delay) el.dataset.revealDelay = binding.value.delay.toString()
		}
		observer.observe(el)
	},
	unmounted(el) {
		observer.unobserve(el)
	}
}
