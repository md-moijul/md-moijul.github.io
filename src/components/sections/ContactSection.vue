<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { CheckCircle2, AlertCircle } from "lucide-vue-next";
import { contactData } from "@/assets/data";

type FormStatus = "idle" | "sending" | "success" | "error";

const email = ref("");
const message = ref("");
const name = ref("");
const status = ref<FormStatus>("idle");

const handleSubmit = async () => {
	if (!email.value || !name.value || !message.value) return;

	status.value = "sending";
	try {
		await emailjs.send(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			{
				user_email: email.value,
				from_name: name.value,
				message: message.value,
			},
		);
		status.value = "success";
		email.value = "";
		message.value = "";
		name.value = "";
	} catch (error) {
		console.error("Failed to send email:", error);
		status.value = "error";
	}
};
</script>

<template>
	<section id="contact" class="scroll-m-16">
		<h2 class="text-3xl font-bold mb-8">Get in Touch</h2>

		<div
			v-if="status === 'success'"
			class="flex flex-col items-center justify-center p-8 space-y-4 text-center border border-white/10 rounded-lg bg-white/5 max-w-xl"
		>
			<CheckCircle2 class="w-12 h-12 text-green-500" />
			<p class="text-lg font-medium">{{ contactData.successMessage }}</p>
		</div>

		<form
			v-else
			@submit.prevent="handleSubmit"
			class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 max-w-xl"
		>
			<div
				v-if="status === 'error'"
				class="md:col-span-3 flex items-center gap-2 text-red-500 text-sm mb-2"
			>
				<AlertCircle class="w-4 h-4" />
				<p>{{ contactData.errorMessage }}</p>
			</div>

			<Input
				v-model="email"
				type="email"
				:placeholder="contactData.placeholders.email"
				required
				aria-label="Your Email"
				class="h-10 bg-black/30 md:row-start-1 md:col-start-1"
			/>
			<Input
				v-model="name"
				type="text"
				:placeholder="contactData.placeholders.name"
				required
				aria-label="Full Name"
				class="h-10 bg-black/30 md:row-start-1 md:col-start-2"
			/>

			<Textarea
				v-model="message"
				:placeholder="contactData.placeholders.message"
				aria-label="Your Message"
				rows="5"
				required
				class="md:col-span-3 bg-black/30"
			/>

			<Button
				:disabled="status === 'sending'"
				class="bg-white/20 w-full md:w-auto md:row-start-1 md:col-start-3 h-10 md:h-full"
				type="submit"
				variant="outline"
				size="stretch"
			>
				{{
					status === "sending"
						? contactData.buttons.sending
						: contactData.buttons.send
				}}
			</Button>
		</form>
	</section>
</template>
