<script setup lang="ts">
import { projects } from "@/assets/data";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowLeft } from "lucide-vue-next";
import { RouterLink } from "vue-router";

const formatDate = (date?: Date) => {
	if (!date) return "—";
	return date.getFullYear();
};
</script>

<template>
	<div class="min-h-screen bg-background text-foreground py-24 px-6 md:px-24">
		<div class="max-w-6xl mx-auto">
			<RouterLink to="/" class="group flex items-center gap-2 text-primary mb-8 hover:text-primary/80 transition-colors w-fit">
				<ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
				<span class="font-medium">Go Back</span>
			</RouterLink>

			<h1 class="text-4xl md:text-5xl font-bold mb-12 tracking-tight">All Projects</h1>

			<div class="overflow-x-auto table-container">
				<table class="w-full text-left border-collapse min-w-[600px] md:min-w-0">
					<thead>
						<tr class="border-b border-border text-muted-foreground uppercase text-xs tracking-widest">
							<th class="py-4 px-4 font-semibold">Year</th>
							<th class="py-4 px-4 font-semibold">Project</th>
							<th class="py-4 px-4 font-semibold">Stack</th>
							<th class="py-4 px-4 font-semibold">Links</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="project in projects"
							:key="project.name"
							class="border-b border-border/50 hover:bg-white/5 transition-colors group"
						>
							<td class="py-4 px-4 text-muted-foreground tabular-nums">
								{{ formatDate(project.date) }}
							</td>
							<td class="py-4 px-4">
								<span class="font-bold text-primary group-hover:text-primary/90">{{ project.name }}</span>
							</td>
							<td class="py-4 px-4">
								<div class="flex flex-wrap gap-2 max-w-[300px] md:max-w-none">
									<Badge
										v-for="tech in project.stack"
										:key="tech"
										variant="outline"
										class="bg-black/20 text-[10px] py-0 px-2"
									>
										{{ tech }}
									</Badge>
								</div>
							</td>
							<td class="py-4 px-4">
								<div class="flex items-center gap-4">
									<a
										v-if="project.sourceCode"
										:href="project.sourceCode"
										target="_blank"
										rel="noopener noreferrer"
										class="text-muted-foreground hover:text-primary transition-colors"
										:title="`Source code for ${project.name}`"
									>
										<Github class="w-5 h-5" />
									</a>
									<a
										v-if="project.liveUrl"
										:href="project.liveUrl"
										target="_blank"
										rel="noopener noreferrer"
										class="text-muted-foreground hover:text-primary transition-colors"
										:title="`Live demo for ${project.name}`"
									>
										<ExternalLink class="w-5 h-5" />
									</a>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
.table-container {
	scrollbar-width: none;
	-ms-overflow-style: none;
}
.table-container::-webkit-scrollbar {
	display: none;
}
</style>
