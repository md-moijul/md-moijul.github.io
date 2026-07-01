<script setup lang="ts">
import type { Project } from "@/assets/data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStackFilter } from "@/composables/useStackFilter";

defineProps<{
	project: Project;
}>();

const { isStackActive, toggleStack } = useStackFilter();
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
				:variant="isStackActive(tech) ? 'sparkly' : 'default'"
				@click="toggleStack(tech)"
				class="cursor-pointer"
			>
				{{ tech }}
			</Badge>
		</CardFooter>
	</Card>
</template>
