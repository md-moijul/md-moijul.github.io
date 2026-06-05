<script setup lang="ts">
import type { Experience } from "@/assets/data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

defineProps<{
	experiences: Experience[];
}>();
</script>

<template>
	<section id="experience" class="scroll-m-16 min-h-screen">
		<h2 class="text-xl font-bold uppercase tracking-widest text-primary mb-8">
			Experience
		</h2>
		<div class="space-y-6">
			<Card v-for="(experience, index) in experiences" :key="index">
				<CardHeader>
					<CardTitle>
						<a
							v-if="experience.url"
							:href="experience.url"
							target="_blank"
							rel="noopener noreferrer"
							class="relative z-20 inline-flex items-center gap-1 hover:text-primary/80 transition-colors pointer-events-auto cursor-pointer"
						>
							<span class="decoration-muted-foreground/50 underline-offset-4">
								{{ experience.company }}
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="opacity-50 flex-shrink-0"
							>
								<path d="M15 3h6v6" />
								<path d="M10 14 21 3" />
								<path
									d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
								/>
							</svg>
						</a>
						<span v-else>{{ experience.company }}</span>
					</CardTitle>
					<CardDescription>
						{{ experience.location }}
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div
						v-for="(role, roleIndex) in experience.roles"
						:key="roleIndex"
						class="space-y-1"
					>
						<div
							class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
						>
							<h3 class="font-medium text-foreground">{{ role.title }}</h3>
							<span class="text-sm font-normal text-muted-foreground">
								{{
									role.startDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
									})
								}}
								—
								{{
									role.endDate === "present"
										? "Present"
										: role.endDate.toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
											})
								}}
							</span>
						</div>
					</div>
					<div class="space-y-4 mt-4">
                        <p v-for="(p, pIndex) in experience.desc" :key="pIndex" class="text-muted-foreground">{{ p }}</p>
                    </div>
				</CardContent>
			</Card>
		</div>
	</section>
</template>
