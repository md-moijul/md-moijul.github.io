<template>
  <div class="background-blobs" :class="{ 'is-tuning': tuningMode }">
    <!-- Tuning Control Panel -->
    <div v-if="tuningMode" class="tuning-panel">
      <h3>Tuning Mode</h3>
      <div class="controls">
        <label>Active Blob:</label>
        <div class="blob-buttons">
          <button v-for="i in 6" :key="i" @click="activeBlob = i" :class="{ active: activeBlob === i }">{{ i }}</button>
        </div>
      </div>
      <div class="controls">
        <label>
          <input type="checkbox" v-model="showSvg" /> Show SVG Overlay
        </label>
        <label>
          <input type="checkbox" v-model="showCss" /> Show CSS Blob
        </label>
        <label>
          <input type="checkbox" v-model="showOutlines" /> Show exact boundaries (Red border, no blur)
        </label>
      </div>
    </div>

    <!-- SVG Overlay -->
    <EllipsesOverlay v-if="tuningMode && showSvg" :activeBlob="activeBlob" :showOutlines="showOutlines" />

    <!-- CSS Blobs -->
    <div 
      class="blob blob1" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 1 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 1 }"
      v-show="!tuningMode || (activeBlob === 1 ? showCss : false)"
    ></div>
    <div 
      class="blob blob2" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 2 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 2 }"
      v-show="!tuningMode || (activeBlob === 2 ? showCss : false)"
    ></div>
    <div 
      class="blob blob3" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 3 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 3 }"
      v-show="!tuningMode || (activeBlob === 3 ? showCss : false)"
    ></div>
    <div 
      class="blob blob4" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 4 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 4 }"
      v-show="!tuningMode || (activeBlob === 4 ? showCss : false)"
    ></div>
    <div 
      class="blob blob5" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 5 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 5 }"
      v-show="!tuningMode || (activeBlob === 5 ? showCss : false)"
    ></div>
    <div 
      class="blob blob6" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 6 && showOutlines, 'tuning-hidden': tuningMode && activeBlob !== 6 }"
      v-show="!tuningMode || (activeBlob === 6 ? showCss : false)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';

const EllipsesOverlay = defineAsyncComponent(() => import('./EllipsesOverlay.vue'));

const props = defineProps<{
  tuningMode?: boolean;
}>();

const activeBlob = ref(1);
const showSvg = ref(true);
const showCss = ref(true);
const showOutlines = ref(true);
</script>

<style scoped>
.background-blobs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
  overflow: hidden;
  background-color: transparent;
}

.background-blobs.is-tuning {
  z-index: 100;
  pointer-events: auto;
}

.overlay-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/Ellipses.svg');
  background-size: 100% 100%;
  opacity: 0.5;
  z-index: 10;
}

.blob {
  position: absolute;
  filter: blur(100px);
  border-radius: 50%;
  opacity: 0.6;
  transform-origin: 0 0;
  will-change: transform;
}
W
/* Primary Teal/Cyan Blob */
.blob1 {
  width: calc((933.408 / 1440) * 100vw);
  height: calc((575.59 / 900) * 100vh);
  left: calc((46.1763 / 1440) * 100vw);
  top: calc((325.332 / 900) * 100vh);
  transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0);
  background: linear-gradient(to right, #207E81 0%, #85FEEC 100%);
  animation: drift-1 18s ease-in-out infinite alternate;
}

.blob2 {
  width: calc((1050.954 / 1440) * 100vw);
  height: calc((366.434 / 900) * 100vh);
  left: calc((255.27 / 1440) * 100vw);
  top: calc((577.747 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(-167.874deg);
  background: #42FF00;
  animation: drift-2 22s ease-in-out infinite alternate;
}

.blob3 {
  width: calc((533.558 / 1440) * 100vw);
  height: calc((480.2 / 900) * 100vh);
  left: calc((314.146 / 1440) * 100vw);
  top: calc((776.217 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(-99.2188deg);
  background: linear-gradient(to right, white 0%, rgba(248, 122, 44, 0.05) 100%);
  animation: drift-3 20s ease-in-out infinite alternate;
}

.blob4 {
  width: calc((612.896 / 1440) * 100vw);
  height: calc((654.372 / 900) * 100vh);
  left: calc((367.089 / 1440) * 100vw);
  top: calc((1180.04 / 900) * 100vh);
  transform-origin: 0 0;
  transform: matrix(0.0736132, -0.997975, 0.939907, -0.34143, 0, 0);
  background: linear-gradient(to right, #FFE36A 0%, #FF3FBE 100%);
  animation: drift-4 25s ease-in-out infinite alternate;
}

.blob5 {
  width: calc((681 / 1440) * 100vw);
  height: calc((296 / 900) * 100vh);
  left: calc((-76 / 1440) * 100vw);
  top: calc((431 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(0deg);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  background: linear-gradient(to top left, #9FF7FE 0%, #03FB56 55%, rgba(3, 251, 86, 0) 100%);
  filter: blur(40px); /* 19.2px roughly translates to 40px visual blur in CSS */
  animation: drift-5 19s ease-in-out infinite alternate;
}

.blob6 {
  width: calc((318 / 1440) * 100vw);
  height: calc((1401 / 900) * 100vh);
  left: calc((544 / 1440) * 100vw);
  top: calc((-253 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(-45deg);
  border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
  background: linear-gradient(to top left, #00FFF7 0%, #FF0054 100%);
  filter: blur(150px);
  animation: drift-6 24s ease-in-out infinite alternate;
}

@keyframes drift-1 {
  0% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(30px, -40px, 0px) scale(1.05); }
  100% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(-20px, 20px, 0px) scale(0.95); }
}

@keyframes drift-2 {
  0% { transform: rotate(-165.874deg) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: rotate(-165.874deg) translate3d(-40px, 20px, 0px) scale(1.02); }
  66% { transform: rotate(-165.874deg) translate3d(20px, -30px, 0px) scale(0.98); }
  100% { transform: rotate(-165.874deg) translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-3 {
  0% { transform: rotate(-99.2188deg) translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: rotate(-99.2188deg) translate3d(40px, 50px, 0px) scale(0.9); }
  100% { transform: rotate(-99.2188deg) translate3d(-30px, -20px, 0px) scale(1.05); }
}

@keyframes drift-4 {
  0% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(-50px, -30px, 0px) scale(1.1); }
  100% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(30px, 40px, 0px) scale(0.95); }
}

@keyframes drift-5 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: translate3d(-30px, 30px, 0px) scale(1.05); }
  100% { transform: translate3d(40px, -20px, 0px) scale(0.9); }
}

@keyframes drift-6 {
  0% { transform: rotate(-45deg) translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: rotate(-45deg) translate3d(50px, -50px, 0px) scale(1.1); }
  100% { transform: rotate(-45deg) translate3d(-40px, 30px, 0px) scale(0.95); }
}

/* Tuning Panel Styles */
.tuning-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #333;
  padding: 15px;
  border-radius: 8px;
  z-index: 9999;
  color: white;
  font-family: sans-serif;
  pointer-events: auto;
}
.tuning-panel h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
}
.tuning-panel .controls {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.tuning-panel .blob-buttons {
  display: flex;
  gap: 5px;
}
.tuning-panel button {
  background: #333;
  border: 1px solid #555;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
.tuning-panel button.active {
  background: #42FF00;
  color: black;
  border-color: #42FF00;
}
.tuning-panel label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

/* Tuning Mode active state for blobs */
.tuning-active {
  animation: none !important;
  filter: none !important;
  border: 2px solid red;
}
.tuning-hidden {
  display: none !important;
}
</style>
