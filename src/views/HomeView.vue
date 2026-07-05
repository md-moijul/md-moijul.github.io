<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import { projects, experiences } from "@/assets/data";

// Eagerly preload async chunks
const expPromise = import("@/components/sections/ExperienceSection.vue");
const projPromise = import("@/components/sections/ProjectsSection.vue");
const contactPromise = import("@/components/sections/ContactSection.vue");

const ExperienceSection = defineAsyncComponent(() => expPromise);
const ProjectsSection = defineAsyncComponent(() => projPromise);
const ContactSection = defineAsyncComponent(() => contactPromise);

const featuredProjects = computed(() => projects.filter(p => p.featured));
</script>

<template>
  <div class="max-w-3xl px-8 sm:px-12 md:px-16 space-y-24 md:space-y-32">
    <AboutSection class="pt-8 sm:pt-12 md:pt-16" />
    <ExperienceSection :experiences="experiences" />
    <ProjectsSection :projects="featuredProjects" />
    <ContactSection class="pb-8 sm:pb-12 md:pb-16" />
  </div>
</template>
