<template>
  <div class="test-view">
    <BackgroundBlobs :tuningMode="true" />
  </div>
</template>

<script setup lang="ts">
import BackgroundBlobs from '@/components/ui/BackgroundBlobs.vue';
</script>

<style scoped>
.test-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
