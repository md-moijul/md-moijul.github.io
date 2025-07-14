<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const activeSection = ref("");
const sectionIds = ["about", "experience", "projects", "contact"];

// A map to store the visibility ratio of each section.
const sectionRatios = new Map<string, number>();
let observer: IntersectionObserver;

const updateActiveSection = () => {
	let bestMatch = { id: "", ratio: -1 };
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
	const thresholds = Array.from(Array(101).keys(), (i) => i / 100);
	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				sectionRatios.set(entry.target.id, entry.intersectionRatio);
			});
			updateActiveSection();
		},
		{ threshold: thresholds }
	);
	sectionIds.forEach((id) => {
		const section = document.getElementById(id);
		if (section) observer.observe(section);
	});
});

onUnmounted(() => {
	if (observer) observer.disconnect();
});
</script>

<template>
	<nav class="flex flex-col p-8 sm:p-12 md:p-16">
		<div class="mb-16">
			<h1 class="font-display text-4xl sm:text-5xl tracking-tight text-foreground uppercase mb-3">
				MD Moijul Islam
			</h1>
			<h2 class="font-sans text-lg sm:text-xl font-semibold text-foreground mb-4">Junior Software Developer</h2>
			<p class="font-sans text-muted-foreground max-w-xs">
				I build accessible, pixel-perfect digital experiences for the web.
			</p>
		</div>

		<nav class="flex flex-col items-start space-y-4">
			<a
				v-for="sectionId in sectionIds"
				:key="sectionId"
				:href="`#${sectionId}`"
				class="font-sans font-medium tracking-widest uppercase text-xs transition-colors hover:text-foreground"
				:class="activeSection === sectionId ? 'active-link' : 'text-muted-foreground'"
			>
				{{ sectionId }}
			</a>
		</nav>

		<div class="mt-auto pt-16">
			<a
				href="https://linkedin.com/in/md-moijul"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<img src="../assets/linkedin.svg" class="h-6 w-6" alt="LinkedIn Profile" />
			</a>
		</div>
	</nav>
</template>

<style scoped>
.active-link {
	color: hsl(var(--foreground));
	font-weight: 700;
}

.active-link::before {
	content: "[";
	margin-right: 0.5em;
	font-weight: 400;
}

.active-link::after {
	content: "]";
	margin-left: 0.5em;
	font-weight: 400;
}
</style>
