<script setup lang="ts">
import type { Project } from "@/assets/data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

defineProps<{
	project: Project;
	activeStacks: string[];
}>();

defineEmits<{
	'toggle-stack': [tech: string]
}>();
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>{{ project.name }}</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-muted-foreground">{{ project.desc }}</p>
		</CardContent>
		<CardFooter v-if="project.stack.length > 0" class="flex-wrap gap-2">
			<Badge 
				v-for="tech in project.stack" 
				:key="tech"
				:variant="activeStacks.includes(tech) ? 'sparkly' : 'default'"
				@click="$emit('toggle-stack', tech)"
				class="cursor-pointer"
			>
				{{ tech }}
			</Badge>
		</CardFooter>
	</Card>
</template>

