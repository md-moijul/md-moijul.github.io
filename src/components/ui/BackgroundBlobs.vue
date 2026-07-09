<template>
  <div class="background-blobs" :class="{ 'is-tuning': tuningMode, 'bg-gradient-test': showGradientBg }">
    <!-- Tuning Control Panel -->
    <div v-if="tuningMode" class="tuning-panel scrollbar-hide">
      <div class="tuning-tabs">
        <button @click="activeTab = 'general'" :class="{ active: activeTab === 'general' }">General</button>
        <button @click="activeTab = 'noise'" :class="{ active: activeTab === 'noise' }">Noise</button>
        <button @click="activeTab = 'blobs'" :class="{ active: activeTab === 'blobs' }">Blobs</button>
        <button @click="activeTab = 'legacy'" :class="{ active: activeTab === 'legacy' }" style="color: #FF0054;">Legacy</button>
      </div>

      <div v-if="activeTab === 'general'" class="tab-content">
        <div class="controls">
          <label><input type="checkbox" v-model="showGradientBg" /> Experiment: Simple Gradient BG</label>
          <hr style="margin: 5px 0; border-color: #555" />
          <label><input type="checkbox" v-model="showSvg" /> Show SVG Overlay</label>
          <label><input type="checkbox" v-model="showCss" /> Show CSS Blobs</label>
          <label><input type="checkbox" v-model="showOutlines" /> Show exact boundaries</label>
        </div>
        <button class="log-config-btn" @click="logConfig">Log Config to Console</button>
      </div>

      <div v-if="activeTab === 'noise'" class="tab-content">
        <div class="controls">
          <label>Noise Type:
            <select v-model="noiseType" style="color: black;">
              <option value="turbulence">Turbulence</option>
              <option value="fractalNoise">Fractal Noise</option>
            </select>
          </label>
          <label>Base Freq: {{ baseFrequency.toFixed(2) }}
            <input type="range" min="0.1" max="5.0" step="0.05" v-model.number="baseFrequency" />
          </label>
          <label>Octaves: {{ numOctaves }}
            <input type="range" min="1" max="10" step="1" v-model.number="numOctaves" />
          </label>
          <label>Contrast: {{ noiseContrast }}%
            <input type="range" min="100" max="2000" step="50" v-model.number="noiseContrast" />
          </label>
          <label>Blur: {{ noiseBlur }}px
            <input type="range" min="0" max="10" step="0.1" v-model.number="noiseBlur" />
          </label>
          <label>Opacity: {{ noiseOpacity.toFixed(2) }}
            <input type="range" min="0" max="1" step="0.01" v-model.number="noiseOpacity" />
          </label>
          <label><input type="checkbox" v-model="crispEdges" /> Pixelated (Crisp Edges)</label>
        </div>
      </div>

      <div v-if="activeTab === 'blobs'" class="tab-content">
        <div class="controls">
          <label>Active Blob:</label>
          <div class="blob-buttons">
            <button v-for="i in 6" :key="i" @click="activeBlob = i" :class="{ active: activeBlob === i }">{{ i }}</button>
          </div>
          <hr style="margin: 10px 0; border-color: #555" />
          <label><input type="checkbox" v-model="isolateBlob" /> Isolate Active Blob</label>
        </div>
        <hr style="margin: 10px 0; border-color: #555" />
        <div class="controls" v-if="blobConfigs[activeBlob - 1]">
          <h4>Blob {{ activeBlob }} Settings</h4>
          <label>Blur Radius: {{ blobConfigs[activeBlob - 1].blur }}px
            <input type="range" min="0" max="300" step="1" v-model.number="blobConfigs[activeBlob - 1].blur" />
          </label>
          <label>Opacity: {{ blobConfigs[activeBlob - 1].opacity.toFixed(2) }}
            <input type="range" min="0" max="1" step="0.05" v-model.number="blobConfigs[activeBlob - 1].opacity" />
          </label>
        </div>
      </div>

      <div v-if="activeTab === 'legacy'" class="tab-content">
        <div class="controls">
          <label><input type="checkbox" v-model="legacyMode" /> <strong>Enable Legacy Mode</strong></label>
          <p style="font-size: 11px; margin: 0; color: #aaa;">This replaces all modern blobs/noise with the exact code from before we touched it.</p>
        </div>
        <hr style="margin: 10px 0; border-color: #555" />
        <div class="controls" v-if="legacyMode">
          <label>Original Noise Opacity: {{ legacyNoiseOpacity.toFixed(2) }}
            <input type="range" min="0" max="1" step="0.01" v-model.number="legacyNoiseOpacity" />
          </label>
          <label>Original Noise Blur: {{ legacyNoiseBlur.toFixed(1) }}px
            <input type="range" min="0" max="10" step="0.1" v-model.number="legacyNoiseBlur" />
          </label>
        </div>
      </div>
    </div>

    <!-- Legacy Mode Container (Pre-v3 state) -->
    <div v-if="legacyMode" class="legacy-container">
      <div class="legacy-bg"></div>
      <div class="legacy-noise" :style="{ opacity: legacyNoiseOpacity, filter: legacyNoiseBlur > 0 ? `blur(${legacyNoiseBlur}px)` : 'none' }"></div>
    </div>
    <!-- SVG Overlay -->
    <EllipsesOverlay v-if="!legacyMode && tuningMode && showSvg" :activeBlob="activeBlob" :showOutlines="showOutlines" />

    <!-- Noise Overlay -->
    <div class="noise-overlay" v-show="!legacyMode && (!tuningMode || showCss)" 
         :style="{ 
           filter: `contrast(${noiseContrast}%) blur(${noiseBlur}px)`,
           imageRendering: crispEdges ? 'crisp-edges' : 'auto'
         }">
      <!-- Binding a key to the SVG forces Vue to recreate the element, bypassing the browser bug where updating feTurbulence attributes doesn't trigger a visual re-render -->
      <svg :key="noiseType + '-' + baseFrequency + '-' + numOctaves" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <filter id="bgNoiseFilter">
          <feTurbulence :type="noiseType" :baseFrequency="baseFrequency" :numOctaves="numOctaves" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bgNoiseFilter)" :opacity="noiseOpacity" />
      </svg>
    </div>

    <!-- CSS Blobs -->
    <div 
      class="blob blob1" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 1 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 1 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(1)"
    ></div>
    <div 
      class="blob blob2" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 2 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 2 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(2)"
    ></div>
    <div 
      class="blob blob3" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 3 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 3 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(3)"
    ></div>
    <div 
      class="blob blob4" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 4 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 4 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(4)"
    ></div>
    <div 
      class="blob blob5" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 5 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 5 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(5)"
    ></div>
    <div 
      class="blob blob6" 
      :class="{ 'tuning-active': tuningMode && activeBlob === 6 && showOutlines, 'tuning-hidden': tuningMode && isolateBlob && activeBlob !== 6 }"
      v-show="!legacyMode && (!tuningMode || showCss)"
      :style="getBlobStyle(6)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, type CSSProperties } from 'vue';

const EllipsesOverlay = defineAsyncComponent(() => import('./EllipsesOverlay.vue'));

const props = defineProps<{
  tuningMode?: boolean;
}>();

const activeTab = ref('general');
const activeBlob = ref(1);
const isolateBlob = ref(false);
const showSvg = ref(true);
const showCss = ref(true);
const showOutlines = ref(false);
const showGradientBg = ref(false);

const legacyMode = ref(false);
const legacyNoiseOpacity = ref(0.04);
const legacyNoiseBlur = ref(0);

watch(showGradientBg, (val) => {
  if (val) {
    showSvg.value = false;
    showCss.value = false;
  }
});

// Reactive tuning state for noise
const noiseType = ref<'turbulence' | 'fractalNoise'>('turbulence');
const baseFrequency = ref(3.75);
const numOctaves = ref(2);
const noiseContrast = ref(1000);
const noiseBlur = ref(0);
const noiseOpacity = ref(0.35);
const crispEdges = ref(true);

// Reactive tuning state for individual blobs
const blobConfigs = ref([
  { id: 1, blur: 100, opacity: 0.6 },
  { id: 2, blur: 100, opacity: 0.6 },
  { id: 3, blur: 100, opacity: 0.6 },
  { id: 4, blur: 100, opacity: 0.7 },
  { id: 5, blur: 19, opacity: 0.6 },
  { id: 6, blur: 150, opacity: 0.6 },
]);

const getBlobStyle = (blobId: number): CSSProperties => {
  const config = blobConfigs.value[blobId - 1];
  return {
    opacity: config.opacity,
    filter: (props.tuningMode && activeBlob.value === blobId && showOutlines.value) 
      ? 'none' 
      : `blur(${config.blur}px)`
  };
};

const logConfig = () => {
  console.log('--- Background Tuning Config ---');
  console.log('Noise:', {
    type: noiseType.value,
    baseFrequency: baseFrequency.value,
    numOctaves: numOctaves.value,
    contrast: noiseContrast.value,
    blur: noiseBlur.value,
    opacity: noiseOpacity.value,
    crispEdges: crispEdges.value
  });
  console.log('Blobs:', JSON.parse(JSON.stringify(blobConfigs.value)));
};
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
  transition: background 0.3s;
}

.background-blobs.bg-gradient-test {
  background: linear-gradient(135deg, #4f46e5, #ec4899, #f59e0b);
}

.legacy-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/Ellipses.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: -2;
}

.legacy-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-image: url('@/assets/Noise.png'); (File deleted in v3) */
  pointer-events: none;
  z-index: -1;
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

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  mix-blend-mode: overlay;
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;
  filter: contrast(1000%);
  pointer-events: none;
  z-index: -1;
}

.noise-overlay svg {
  width: 100%;
  height: 100%;
}

.blob {
  position: absolute;
  /* Blur and opacity are now dynamically applied via inline style for tuning */
  border-radius: 50%;
  transform-origin: 0 0;
  will-change: transform, filter;
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
  animation: drift-1 36s linear infinite;
}

.blob2 {
  width: calc((1050.954 / 1440) * 100vw);
  height: calc((366.434 / 900) * 100vh);
  left: calc((255.27 / 1440) * 100vw);
  top: calc((577.747 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(-165.874deg);
  background: #42FF00;
  animation: drift-2 44s linear infinite;
}

.blob3 {
  width: calc((533.558 / 1440) * 100vw);
  height: calc((480.2 / 900) * 100vh);
  left: calc((314.146 / 1440) * 100vw);
  top: calc((776.217 / 900) * 100vh);
  transform-origin: 50% 50%;
  transform: rotate(-99.2188deg);
  background: linear-gradient(to right, white 0%, rgba(248, 122, 44, 0.05) 100%);
  animation: drift-3 40s linear infinite;
}

.blob4 {
  width: calc((612.896 / 1440) * 100vw);
  height: calc((654.372 / 900) * 100vh);
  left: calc((367.089 / 1440) * 100vw);
  top: calc((1180.04 / 900) * 100vh);
  transform-origin: 0 0;
  transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0);
  background: linear-gradient(to right, #FFE36A 0%, #FF3FBE 100%);
  animation: drift-4 50s linear infinite;
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
  /* Filter moved to inline style */
  animation: drift-5 38s linear infinite;
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
  /* Filter moved to inline style */
  animation: drift-6 48s linear infinite;
}

@keyframes drift-1 {
  0% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(30px, -40px, 0px) scale(1.05); }
  66% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(-20px, 20px, 0px) scale(0.95); }
  100% { transform: matrix(0.919496, 0.393099, -0.285986, 0.958234, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-2 {
  0% { transform: rotate(-165.874deg) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: rotate(-165.874deg) translate3d(-40px, 20px, 0px) scale(1.02); }
  66% { transform: rotate(-165.874deg) translate3d(20px, -30px, 0px) scale(0.98); }
  100% { transform: rotate(-165.874deg) translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-3 {
  0% { transform: rotate(-99.2188deg) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: rotate(-99.2188deg) translate3d(40px, 50px, 0px) scale(0.9); }
  66% { transform: rotate(-99.2188deg) translate3d(-30px, -20px, 0px) scale(1.05); }
  100% { transform: rotate(-99.2188deg) translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-4 {
  0% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(-50px, -30px, 0px) scale(1.1); }
  66% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(30px, 40px, 0px) scale(0.95); }
  100% { transform: matrix(0.0636132, -0.997975, 0.939907, -0.34143, 0, 0) translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-5 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: translate3d(-30px, 30px, 0px) scale(1.05); }
  66% { transform: translate3d(40px, -20px, 0px) scale(0.9); }
  100% { transform: translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-6 {
  0% { transform: rotate(-45deg) translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: rotate(-45deg) translate3d(50px, -50px, 0px) scale(1.1); }
  66% { transform: rotate(-45deg) translate3d(-40px, 30px, 0px) scale(0.95); }
  100% { transform: rotate(-45deg) translate3d(0px, 0px, 0px) scale(1); }
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
  max-height: 90vh;
  overflow-y: auto;
  min-width: 280px;
}
.tuning-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #555;
  padding-bottom: 10px;
}
.tuning-tabs button {
  background: transparent;
  color: white;
  border: 1px solid #555;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.tuning-tabs button.active {
  background: #42FF00;
  color: black;
  border-color: #42FF00;
  font-weight: bold;
}
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.log-config-btn {
  margin-top: 15px;
  background: #ff0054 !important;
  color: white !important;
  border: none !important;
  padding: 10px !important;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
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
.tuning-panel input[type="range"] {
  width: 100px;
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
