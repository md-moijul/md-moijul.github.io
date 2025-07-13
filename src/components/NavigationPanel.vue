<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("");
const sectionIds = ["about", "experience", "projects", "contact"];

// A map to store the visibility ratio of each section.
const sectionRatios = new Map<string, number>();
let observer: IntersectionObserver;

const updateActiveSection = () => {
	let bestMatch = { id: "", ratio: -1 };

	// Find the section with the highest visibility ratio.
	sectionRatios.forEach((ratio, id) => {
		if (ratio > bestMatch.ratio) {
			bestMatch = { id, ratio };
		}
	});

	// Set the active section only if there is a visible one.
	if (bestMatch.ratio > 0) {
		activeSection.value = bestMatch.id;
	}
};

onMounted(() => {
	// Create an array of thresholds from 0 to 1.0 in 0.01 increments.
	// This makes the observer fire continuously as the section scrolls.
	const thresholds = Array.from(Array(101).keys(), (i) => i / 100);

	observer = new IntersectionObserver(
		(entries) => {
			// Update the map with the latest ratios for each entry.
			entries.forEach((entry) => {
				sectionRatios.set(entry.target.id, entry.intersectionRatio);
			});
			// Determine the new active section.
			updateActiveSection();
		},
		{ threshold: thresholds }
	);

	// Observe all sections with the single observer.
	sectionIds.forEach((id) => {
		const section = document.getElementById(id);
		if (section) observer.observe(section);
	});
});

onUnmounted(() => {
	if (observer) observer.disconnect();
});
</script>
```
<template>
	<nav class="flex flex-col flex-1 p-16 justify-between h-auto">
		<div>
			<h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-2">
				MD Moijul Islam
			</h1>
			<h2 class="text-xl sm:text-2xl font-semibold mb-6">Junior Software Developer</h2>
			<p class="text-gray-300 mb-10 text-lg">
				I build accessible, pixel-perfect digital experiences for the web.
			</p>

			<nav class="space-y-3">
				<a
					href="#about"
					class="block text-xl font-medium"
					:class="{ 'active-link': activeSection === 'about' }"
				>
					About
				</a>
				<a
					href="#experience"
					class="block text-xl font-medium"
					:class="{ 'active-link': activeSection === 'experience' }"
				>
					Experience
				</a>
				<a
					href="#projects"
					class="block text-xl font-medium"
					:class="{ 'active-link': activeSection === 'projects' }"
				>
					Projects
				</a>
				<a
					href="#contact"
					class="block text-xl font-medium"
					:class="{ 'active-link': activeSection === 'contact' }"
				>
					Contact
				</a>
			</nav>
		</div>

		<div class="mt-auto">
			<a href="https://linkedin.com/in/md-moijul" target="_blank" rel="noopener noreferrer" class="text-gray-400">
				<img src="./assets/linkedinn.svg" class="logo vue" alt="linkedin" />
			</a>
		</div>
	</nav>
</template>

<style>
.active-link {
	color: white;
	font-weight: bold;
}

.active-link::before {
	content: "[";
	margin-right: 0.25em;
}

.active-link::after {
	content: "]";
	margin-left: 0.25em;
}
</style>
