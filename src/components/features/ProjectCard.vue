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
			<CardTitle v-reveal="{ stagger: true }" class="opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">{{ project.name }}</CardTitle>
		</CardHeader>
		<CardContent>
			<p v-reveal="{ stagger: true }" class="text-muted-foreground opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">{{ project.desc }}</p>
		</CardContent>
		<CardFooter v-if="project.stack.length > 0" class="flex-wrap gap-2">
			<Badge 
				v-for="tech in project.stack" 
				:key="tech"
				:variant="activeStacks.includes(tech) ? 'sparkly' : 'default'"
				@click="$emit('toggle-stack', tech)"
				v-reveal="{ stagger: true }"
				class="cursor-pointer opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0"
			>
				{{ tech }}
			</Badge>
		</CardFooter>
	</Card>
</template>

