<script setup lang="ts">
import { experiences } from "../../assets/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
</script>

<template>
	<section id="experience" class="scroll-m-16 min-h-screen">
		<h2 class="text-xl font-bold uppercase tracking-widest text-primary mb-8">Experience</h2>
		<div class="space-y-6">
			<Card v-for="(experience, index) in experiences" :key="index">
				<CardHeader>
					<CardTitle class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
						<a :href="experience.url" target="_blank" class="hover:underline">
							{{ experience.jobTitle }} 
						</a>
						<span class="text-sm font-normal text-muted-foreground">
							{{ experience.startDate.toLocaleDateString("en-US", { year: "numeric", month: "short" }) }}
							—
							{{
								experience.EndDate === "present"
									? "Present"
									: experience.EndDate.toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
									  })
							}}
						</span>
					</CardTitle>
					<CardDescription>
                        {{ experience.company }}, {{ experience.location }}.
                    </CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">{{ experience.desc }}</p>
				</CardContent>
				<CardFooter v-if="experience.projects.length > 0" class="flex-nowrap overflow-x-scroll gap-2">
					<Badge v-for="project in experience.projects" :key="project" variant="secondary">&#128279; {{ project.replace(/ /g,"_") }} </Badge>
				</CardFooter>
			</Card>
		</div>
	</section>
</template>
