<template>
  <div class="background-blobs">
    <div class="blob blob1"></div>
    <div class="blob blob2"></div>
    <div class="blob blob3"></div>
    <div class="blob blob4"></div>
  </div>
</template>

<script setup lang="ts">
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

.blob {
  position: absolute;
  filter: blur(100px);
  border-radius: 50%;
  opacity: 0.6;
  will-change: transform;
}

.blob1 {
  width: 60vw;
  height: 60vw;
  top: -10vw;
  left: -10vw;
  background: radial-gradient(circle, #85FEEC 0%, #207E81 100%);
  animation: drift-1 18s ease-in-out infinite alternate;
}

.blob2 {
  width: 50vw;
  height: 50vw;
  top: 40vh;
  right: -10vw;
  background: radial-gradient(circle, #42FF00 0%, #19A538 100%);
  animation: drift-2 22s ease-in-out infinite alternate;
}

.blob3 {
  width: 70vw;
  height: 70vw;
  bottom: -20vh;
  left: 10vw;
  background: radial-gradient(circle, #F87A2C 0%, white 100%);
  animation: drift-3 20s ease-in-out infinite alternate;
}

.blob4 {
  width: 40vw;
  height: 40vw;
  top: 20vh;
  left: 30vw;
  background: radial-gradient(circle, #FFE36A 0%, #FF3FBE 100%);
  animation: drift-4 25s ease-in-out infinite alternate;
}

@keyframes drift-1 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: translate3d(30px, -40px, 0px) scale(1.05); }
  100% { transform: translate3d(-20px, 20px, 0px) scale(0.95); }
}

@keyframes drift-2 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  33% { transform: translate3d(-40px, 20px, 0px) scale(1.02); }
  66% { transform: translate3d(20px, -30px, 0px) scale(0.98); }
  100% { transform: translate3d(0px, 0px, 0px) scale(1); }
}

@keyframes drift-3 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: translate3d(40px, 50px, 0px) scale(0.9); }
  100% { transform: translate3d(-30px, -20px, 0px) scale(1.05); }
}

@keyframes drift-4 {
  0% { transform: translate3d(0px, 0px, 0px) scale(1); }
  50% { transform: translate3d(-50px, -30px, 0px) scale(1.1); }
  100% { transform: translate3d(30px, 40px, 0px) scale(0.95); }
}
</style>
