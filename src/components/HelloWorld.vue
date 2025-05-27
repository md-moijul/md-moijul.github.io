<script setup lang="ts">
import { Button } from "@/components/ui/button";
defineProps<{ msg: string }>();
</script>

<template>
	<p class="read-the-docs">vue project with tw and shadcn</p>
	<Button>click me</Button>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
