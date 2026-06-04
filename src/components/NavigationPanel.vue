<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useScrollTo } from "@/composables/useScrollTo";
import { lenisInstance } from "@/composables/useLenis";

const activeSection = ref("about");
const sectionIds = ["about", "experience", "projects", "contact"];
const route = useRoute();

const { scrollToSection } = useScrollTo(activeSection);

const handleScroll = (args?: any) => {
	const triggerPoint = window.innerHeight * 0.2;
	let current = activeSection.value;

	// Calculate which section is currently at the top
	sectionIds.forEach((id) => {
		const el = document.getElementById(id);
		if (el) {
			const rect = el.getBoundingClientRect();
			if (rect.top <= triggerPoint) {
				current = id;
			}
		}
	});

	// Precise bottom detection: only trigger if we are at the literal end
	if (args) {
		const { scroll, limit } = args;
		if (limit > 0 && scroll >= limit - 10) {
			current = "contact";
		}
	} else if (lenisInstance.value) {
		const { scroll, limit } = lenisInstance.value;
		if (limit > 0 && scroll >= limit - 10) {
			current = "contact";
		}
	}

	activeSection.value = current;
};

onMounted(() => {
	if (lenisInstance.value) {
		lenisInstance.value.on("scroll", handleScroll);
		// Initial check
		handleScroll();
	}
});

// Watch for lenisInstance initialization and route changes
watch(
	[lenisInstance, () => route.path],
	([newInstance], [oldInstance]) => {
		if (oldInstance && oldInstance !== newInstance) {
			oldInstance.off("scroll", handleScroll);
		}
		if (newInstance) {
			newInstance.on("scroll", handleScroll);
			nextTick(() => handleScroll());
		}
	},
	{ immediate: true },
);

onUnmounted(() => {
	if (lenisInstance.value) {
		lenisInstance.value.off("scroll", handleScroll);
	}
});
</script>

<template>
	<nav class="flex flex-col h-full justify-between p-8 sm:p-12 md:p-16">
		<div class="mb-16">
			<h1
				class="font-display text-4xl sm:text-5xl tracking-tight text-foreground uppercase mb-3"
			>
				MD Moijul Islam
			</h1>
			<h2
				class="font-sans text-lg sm:text-xl font-semibold text-foreground mb-4"
			>
				Software Developer
			</h2>
			<p class="font-sans text-muted-foreground max-w-xs">
				I build accessible, pixel-perfect digital experiences for the web.
			</p>
		</div>

		<nav class="flex flex-col items-start space-y-4">
			<a
				v-for="sectionId in sectionIds"
				:key="sectionId"
				:href="`#${sectionId}`"
				@click="scrollToSection(sectionId, $event)"
				class="font-sans font-medium tracking-widest uppercase text-xs transition-colors hover:text-foreground"
				:class="
					activeSection === sectionId ? 'active-link' : 'text-muted-foreground'
				"
			>
				{{ sectionId }}
			</a>
		</nav>

		<div class="flex gap-2 pt-16">
			<a
				href="https://linkedin.com/in/md-moijul"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<img
					src="../assets/linkedin.svg"
					class="h-6 w-6"
					alt="LinkedIn Profile"
				/>
			</a>
			<a
				href="https://github.com/md-moijul"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<img src="../assets/github.svg" class="h-6 w-6" alt="GitHub Profile" />
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
