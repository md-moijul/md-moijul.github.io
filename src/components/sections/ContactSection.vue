<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
</script>

<template>
	<section id="contact" class="scroll-m-16">
		<form class="space-y-4 max-w-xl">
			<div class="relative flex w-full gap-4">
				<Input type="email" placeholder="your email *" required aria-label="Your Email" class="h-10" />
				<Button class="bg-white/20" type="submit" variant="outline" size="stretch" aria-label="Send Message">
					SEND
				</Button>
			</div>
			<Textarea placeholder="Say hello..." aria-label="Your Message" rows="5" />
		</form>
	</section>
</template>
