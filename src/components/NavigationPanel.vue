<script setup lang="ts">
import { nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSmoothScroll } from "@/composables/useSmoothScroll";
import { useSectionSpy } from "@/composables/useSectionSpy";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-vue-next";

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
				class="font-display text-4xl sm:text-5xl tracking-tight text-foreground uppercase mb-3 flex flex-wrap gap-[0.3em]"
			>
				<span v-for="(word, i) in ['MD', 'Moijul', 'Islam']" :key="i" v-reveal="{ delay: i * 200 }" class="opacity-0 transition-opacity duration-1000 ease-out data-[revealed=true]:opacity-100">
					{{ word }}
				</span>
			</h1>
			<h2
				class="font-sans text-lg sm:text-xl font-semibold text-foreground mb-4"
			>
				Software Engineer
			</h2>
			<p v-reveal="{ delay: 600 }" class="font-sans text-muted-foreground max-w-xs opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">
				I build high-performance, accessible digital experiences with
				scalability in mind.
			</p>
			<Button
				as="a"
				href="/resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				download="Moijul-Islam-Resume.pdf"
				variant="outline"
				class="bg-white/20 mt-6 w-fit flex items-center gap-2 group transition-colors duration-300 hover:bg-white/30"
			>
				<Download class="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white" />
				Download Resume
			</Button>
		</div>

		<nav class="hidden md:flex flex-col items-start space-y-4">
			<a
				v-for="sectionId in sectionIds"
				:key="sectionId"
				:href="`#${sectionId}`"
				@click="handleNavClick(sectionId, $event)"
				class="font-sans tracking-widest uppercase text-xs transition-colors hover:text-foreground flex items-center group hover:font-bold"
				:class="activeSection === sectionId ? 'text-foreground font-bold' : 'text-muted-foreground font-medium'"
			>
				<span 
					class="transition-all duration-300 ease-out opacity-0 -translate-x-2 mr-2 font-bold group-hover:opacity-100 group-hover:translate-x-0"
					:class="activeSection === sectionId ? '!opacity-100 !translate-x-0' : ''"
				>[</span>
				{{ sectionId }}
				<span 
					class="transition-all duration-300 ease-out opacity-0 translate-x-2 ml-2 font-bold group-hover:opacity-100 group-hover:translate-x-0"
					:class="activeSection === sectionId ? '!opacity-100 !translate-x-0' : ''"
				>]</span>
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
