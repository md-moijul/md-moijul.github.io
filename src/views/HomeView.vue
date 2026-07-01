<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import ExperienceSection from "@/components/sections/ExperienceSection.vue";
import { projects, experiences } from "@/assets/data";

const featuredProjects = computed(() => projects.filter(p => p.featured));
const isLoaded = ref(false);

onMounted(() => {
    // Defer rendering of below-the-fold content to break up long tasks on initial load
    setTimeout(() => {
        isLoaded.value = true;
    }, 50);
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
