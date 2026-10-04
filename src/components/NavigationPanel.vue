<script setup lang="ts">
import { nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSmoothScroll } from "@/composables/useSmoothScroll";
import { useSectionSpy } from "@/composables/useSectionSpy";

const sectionIds = ["about", "experience", "projects", "contact"];
const { scrollToSection, lenis } = useSmoothScroll();
const { activeSection } = useSectionSpy(sectionIds);
const router = useRouter();
const route = useRoute();

const handleNavClick = async (id: string, e?: Event) => {
	if (e) e.preventDefault();

	if (route.path !== "/") {
		await router.push("/");
		
		await nextTick();
		await nextTick();

		if (lenis.value) {
			lenis.value.resize();
			
			const targetId = id.startsWith("#") ? id : `#${id}`;
			const tryScroll = (attempts = 0) => {
				if (document.querySelector(targetId)) {
					lenis.value?.resize();
					scrollToSection(id);
				} else if (attempts < 20) {
					setTimeout(() => tryScroll(attempts + 1), 50);
				}
			};
			tryScroll();
		}
	} else {
		scrollToSection(id);
	}
};
</script>

<template>
	<nav class="flex flex-col md:h-full justify-between p-8 sm:p-12 md:p-16">
		<div class="mb-12 md:mb-16">
			<h1
				class="font-display text-4xl sm:text-5xl tracking-tight text-foreground uppercase mb-3"
			>
				MD Moijul Islam
			</h1>
			<h2
				class="font-sans text-lg sm:text-xl font-semibold text-foreground mb-4"
			>
				Software Engineer
			</h2>
			<p class="font-sans text-muted-foreground max-w-xs">
				I build high-performance, accessible digital experiences with
				scalability in mind.
			</p>
		</div>

		<nav class="hidden md:flex flex-col items-start space-y-4">
			<a
				v-for="sectionId in sectionIds"
				:key="sectionId"
				:href="`#${sectionId}`"
				@click="handleNavClick(sectionId, $event)"
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
			<a
				href="https://www.strava.com/athletes/1521359377"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<img src="../assets/strava.svg" class="h-6 w-6" alt="Strava Profile" />
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
