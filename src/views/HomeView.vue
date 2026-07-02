<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from "vue";
import AboutSection from "@/components/sections/AboutSection.vue";
const ProjectsSection = defineAsyncComponent(() => import("@/components/sections/ProjectsSection.vue"));
const ContactSection = defineAsyncComponent(() => import("@/components/sections/ContactSection.vue"));
const ExperienceSection = defineAsyncComponent(() => import("@/components/sections/ExperienceSection.vue"));
import { projects, experiences } from "@/assets/data";

const featuredProjects = computed(() => projects.filter(p => p.featured));
const isLoaded = ref(false);

onMounted(() => {
    // Defer rendering of below-the-fold content to break up long tasks on initial load
    // Wait for the browser to become idle after LCP to prevent blocking the main thread
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
            isLoaded.value = true;
        });
    } else {
        setTimeout(() => {
            isLoaded.value = true;
        }, 500);
    }
});
</script>

<template>
  <div class="max-w-3xl px-8 sm:px-12 md:px-16 space-y-24 md:space-y-32">
    <AboutSection class="pt-8 sm:pt-12 md:pt-16" />
    <template v-if="isLoaded">
        <ExperienceSection :experiences="experiences" />
        <ProjectsSection :projects="featuredProjects" />
        <ContactSection class="pb-8 sm:pb-12 md:pb-16" />
    </template>
  </div>
</template>
