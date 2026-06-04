<script setup lang="ts">
import type { Project } from "@/assets/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

defineProps<{
	projects: Project[];
}>();
</script>

<template>
	<section id="projects" class="scroll-m-20 min-h-screen">
		<h2 class="text-xl font-bold uppercase tracking-widest text-primary mb-8">Projects</h2>
		<div class="grid grid-cols-1 gap-6">
			<Card v-for="project in projects" :key="project.name">
				<CardHeader>
					<CardTitle>{{ project.name }}</CardTitle>
					<CardDescription v-if="project.date">
						{{ project.date.toLocaleDateString("en-US", { year: "numeric", month: "long" }) }}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">{{ project.desc }}</p>
				</CardContent>
				<CardFooter v-if="project.stack.length > 0" class="flex-wrap gap-2">
					<Badge v-for="tech in project.stack" :key="tech">
						{{ tech }}
					</Badge>
				</CardFooter>
			</Card>
		</div>
		<div class="mt-8 flex">
			<RouterLink to="/archive">
				<Button variant="outline" class="bg-black/20 shadow-md shadow-white"
					>View Full Project Archive</Button
				>
			</RouterLink>
		</div>
	</section>
</template>
