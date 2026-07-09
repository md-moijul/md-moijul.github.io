<template>
  <div class="overlay-container">
    <svg width="1440" height="900" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <g v-show="activeBlob === 1 || activeBlob === 0" :filter="showOutlines ? undefined : 'url(#filter0_f_17_4)'">
          <ellipse cx="466.704" cy="274.295" rx="466.704" ry="274.295" transform="matrix(0.919496 0.393099 -0.285986 0.958234 46.1763 343.332)" fill="url(#paint0_linear_17_4)" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
        </g>
        <g v-show="activeBlob === 2 || activeBlob === 0" :filter="showOutlines ? undefined : 'url(#filter1_df_17_4)'">
          <ellipse cx="780.747" cy="760.964" rx="525.477" ry="183.217" transform="rotate(-165.874 780.747 760.964)" fill="#42FF00" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
        </g>
        <g v-show="activeBlob === 3 || activeBlob === 0" :filter="showOutlines ? undefined : 'url(#filter2_f_17_4)'">
          <ellipse cx="580.925" cy="989.317" rx="266.779" ry="213.1" transform="rotate(-99.2188 580.925 989.317)" fill="url(#paint1_linear_17_4)" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
        </g>
        <g v-show="activeBlob === 4 || activeBlob === 0">
          <foreignObject x="187.365" y="182.718" width="960.27" height="1092.16">
            <div xmlns="http://www.w3.org/1999/xhtml" :style="{ backdropFilter: showOutlines ? 'none' : 'blur(40px)', clipPath: 'url(#bgblur_0_17_4_clip_path)', height: '100%', width: '100%' }"></div>
          </foreignObject>
          <g opacity="0.6" :filter="showOutlines ? undefined : 'url(#filter3_f_17_4)'" data-figma-bg-blur-radius="80">
            <ellipse cx="331.448" cy="297.186" rx="331.448" ry="297.186" transform="matrix(0.0636132 -0.997975 0.939907 -0.34143 367.089 1161.04)" fill="#19A538" fill-opacity="0.7" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
            <ellipse cx="331.448" cy="297.186" rx="331.448" ry="297.186" transform="matrix(0.0636132 -0.997975 0.939907 -0.34143 367.089 1161.04)" fill="url(#paint2_linear_17_4)" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
          </g>
        </g>
        <g v-show="activeBlob === 5 || activeBlob === 0" :filter="showOutlines ? undefined : 'url(#filter4_f_17_4)'">
          <path d="M93.6874 476.321C99.7157 436.569 217.92 421.529 357.705 442.727C497.49 463.926 605.921 513.335 599.892 553.086C593.864 592.837 475.659 607.878 335.875 586.679C196.09 565.481 -76.2125 1017.76 93.6874 476.321Z" fill="url(#paint3_linear_17_4)" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
        </g>
        <g v-show="activeBlob === 6 || activeBlob === 0" :filter="showOutlines ? undefined : 'url(#filter5_f_17_4)'">
          <path d="M457.158 254.742C528.946 292.572 866.537 713.113 1026.36 918.655L1162.48 818.835L663.145 48.6291L427.551 -183.356C294.563 -99.5564 44.1271 64.8814 106.282 52.2377C183.975 36.4329 367.423 207.454 457.158 254.742Z" fill="url(#paint4_linear_17_4)" :stroke="showOutlines ? 'yellow' : 'none'" :stroke-width="showOutlines ? 4 : 0"/>
        </g>
      </g>
      <defs>
        <filter id="filter0_f_17_4" x="-239.455" y="269.069" width="1272.64" height="1041.12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_17_4"/>
        </filter>
        <filter id="filter1_df_17_4" x="31.1711" y="303.823" width="1523.15" height="938.284" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="50" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_17_4"/>
          <feOffset dx="12" dy="12"/>
          <feGaussianBlur stdDeviation="100"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.262745 0 0 0 0 1 0 0 0 0 0.00392157 0 0 0 0.6 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_4"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_4" result="shape"/>
          <feGaussianBlur stdDeviation="19.2433" result="effect2_foregroundBlur_17_4"/>
        </filter>
        <filter id="filter2_f_17_4" x="166.237" y="523.751" width="829.376" height="931.133" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_17_4"/>
        </filter>
        <filter id="filter3_f_17_4" x="187.365" y="182.718" width="960.27" height="1092.16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_17_4"/>
        </filter>
        <clipPath id="bgblur_0_17_4_clip_path" transform="translate(-187.365 -182.718)">
          <ellipse cx="331.448" cy="297.186" rx="331.448" ry="297.186" transform="matrix(0.0636132 -0.997975 0.939907 -0.34143 367.089 1161.04)"/>
        </clipPath>
        <filter id="filter4_f_17_4" x="1.13153" y="394.63" width="637.487" height="387.453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="19.2433" result="effect1_foregroundBlur_17_4"/>
        </filter>
        <filter id="filter5_f_17_4" x="-203.46" y="-483.356" width="1665.94" height="1702.01" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_17_4"/>
        </filter>
        <linearGradient id="paint0_linear_17_4" x1="0" y1="274.295" x2="933.407" y2="274.295" gradientUnits="userSpaceOnUse">
          <stop stop-color="#207E81"/>
          <stop offset="1" stop-color="#85FEEC"/>
        </linearGradient>
        <linearGradient id="paint1_linear_17_4" x1="314.146" y1="989.317" x2="847.704" y2="989.317" gradientUnits="userSpaceOnUse">
          <stop stop-color="white"/>
          <stop offset="1" stop-color="#F87A2C" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="paint2_linear_17_4" x1="0" y1="297.186" x2="662.895" y2="297.186" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFE36A"/>
          <stop offset="1" stop-color="#FF3FBE"/>
        </linearGradient>
        <linearGradient id="paint3_linear_17_4" x1="599.892" y1="553.086" x2="93.6873" y2="476.321" gradientUnits="userSpaceOnUse">
          <stop stop-color="#9FF7FE"/>
          <stop offset="0.552083" stop-color="#03FB56"/>
          <stop offset="1" stop-color="#03FB56" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="paint4_linear_17_4" x1="1020.21" y1="923.167" x2="276.605" y2="-90.8495" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00FFF7"/>
          <stop offset="1" stop-color="#FF0054"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeBlob: number;
  showOutlines?: boolean;
}>();
</script>

<style scoped>
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  pointer-events: none;
}

.overlay-container svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
