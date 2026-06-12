<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<div
		data-slot="card"
		:class="
			cn(
				'bg-black/20 relative text-card-foreground flex flex-col gap-6 rounded-sm border py-6 noise-bg',
				props.class,
			)
		"
	>
		<slot />
	</div>
</template>

<style scoped>
.noise-bg {
	background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E");
	background-size: 182px;
	background-repeat: repeat;
}
</style>
