<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
</script>

<template>
	<section id="contact" class="py-10">
		<div class="flex">
			<Input type="email" placeholder="Email" />
			<Button variant="outline">send</Button>
		</div>
		<Textarea placeholder="Type your message here." />
	</section>
</template>

<style scoped>
section {
}
</style>
