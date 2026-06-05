<script setup lang="ts">
import { projects } from "@/assets/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const formatDate = (date?: Date) => {
	if (!date) return "—";
	return date.getFullYear();
};

const expandedProjects = ref<Set<string>>(new Set());
const toggleExpand = (name: string) => {
	if (expandedProjects.value.has(name)) {
		expandedProjects.value.delete(name);
	} else {
		expandedProjects.value.add(name);
	}
};
</script>

<template>
	<div
		class="w-full min-h-screen p-4 md:p-8 lg:p-12 flex flex-col items-center"
	>
		<div
			class="w-full max-w-6xl bg-black/20 border border-border rounded-xl flex flex-col overflow-hidden shadow-2xl"
		>
			<!-- Modal Header Section -->
			<div
				class="p-6 md:p-8 border-b border-border flex justify-between items-center gap-4 bg-background/50 shrink-0"
			>
				<h1 class="text-3xl md:text-4xl font-bold tracking-tight">
					All Projects
				</h1>

				<Button
					as-child
					variant="ghost"
					class="group hover:text-primary transition-colors shrink-0"
				>
					<RouterLink to="/" class="flex items-center gap-2">
						<span class="font-medium">Go Back</span>
						<ArrowLeft
							class="w-4 h-4 order-first group-hover:-translate-x-1 transition-transform"
						/>
					</RouterLink>
				</Button>
			</div>

			<!-- Sticky Table Header -->
			<div
				class="sticky top-0 z-20 hidden lg:grid lg:grid-cols-[100px_2fr_4fr_3fr_120px] px-6 py-4 bg-white/20 backdrop-blur-md border-b border-border text-muted-foreground uppercase text-[10px] tracking-widest font-semibold shrink-0"
			>
				<div class="min-w-0">Year</div>
				<div class="min-w-0">Project</div>
				<div class="min-w-0">Description</div>
				<div class="min-w-0">Stack</div>
				<div class="min-w-0 text-right pr-4">Links</div>
			</div>
			<div class="flex-1 lg:overflow-x-auto custom-scrollbar" data-lenis-prevent>
				<div
					class="flex flex-col h-full table-container relative overflow-y-auto lg:min-w-[900px]"
				>
					<!-- Scrollable Rows Container -->
					<div class="divide-y divide-border/30 mask-top">
						<div
							v-for="project in projects"
							:key="project.name"
							class="flex flex-col gap-4 lg:grid lg:grid-cols-[100px_2fr_4fr_3fr_120px] px-6 py-8 lg:py-6 hover:bg-white/5 transition-colors group items-start"
						>
							<!-- Year & Mobile Links -->
							<div
								class="w-full flex justify-between items-center lg:block min-w-0 text-muted-foreground tabular-nums text-sm pt-1"
							>
								<span>{{ formatDate(project.date) }}</span>

								<!-- Mobile Links (Hidden on LG) -->
								<div class="flex lg:hidden items-center gap-4">
									<a
										v-if="project.sourceCode"
										:href="project.sourceCode"
										target="_blank"
										rel="noopener noreferrer"
										class="text-muted-foreground hover:text-primary transition-colors"
									>
										<Github class="w-4 h-4" />
									</a>
									<a
										v-if="project.liveUrl"
										:href="project.liveUrl"
										target="_blank"
										rel="noopener noreferrer"
										class="text-muted-foreground hover:text-primary transition-colors"
									>
										<ExternalLink class="w-4 h-4" />
									</a>
								</div>
							</div>

							<!-- Project Name -->
							<div class="min-w-0 pr-4">
								<span
									class="font-bold text-xl lg:text-base text-primary group-hover:text-primary/90 block truncate"
									:title="project.name"
									>{{ project.name }}</span
								>
							</div>

							<!-- Description -->
							<div
								class="min-w-0 pr-8 text-muted-foreground text-sm"
							>
								<p
									class="transition-all duration-300 cursor-pointer lg:hover:text-foreground"
									:class="
										expandedProjects.has(project.name)
											? 'line-clamp-none'
											: 'line-clamp-none lg:line-clamp-3'
									"
									@click="toggleExpand(project.name)"
								>
									{{ project.desc }}
								</p>
							</div>

							<!-- Stack -->
							<div class="min-w-0 pr-4 overflow-hidden">
								<div
									class="flex gap-1.5 transition-all duration-300 flex-wrap"
									:class="{
										'lg:flex-nowrap': !expandedProjects.has(project.name)
									}"
								>
									<Badge
										v-for="tech in project.stack"
										:key="tech"
										variant="outline"
										class="bg-black/20 text-[10px] py-0 px-2 whitespace-nowrap border-border/50 shrink-0"
									>
										{{ tech }}
									</Badge>
								</div>
							</div>

							<!-- Desktop Links (Hidden on Mobile) -->
							<div class="min-w-0 hidden lg:flex items-center justify-end gap-3 pr-4">
								<a
									v-if="project.sourceCode"
									:href="project.sourceCode"
									target="_blank"
									rel="noopener noreferrer"
									class="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
								>
									<Github
										class="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
									/>
								</a>
								<a
									v-if="project.liveUrl"
									:href="project.liveUrl"
									target="_blank"
									rel="noopener noreferrer"
									class="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
								>
									<ExternalLink
										class="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.custom-scrollbar,
.table-container {
	scrollbar-width: thin;
	scrollbar-color: var(--border) transparent;
}

.custom-scrollbar::-webkit-scrollbar,
.table-container::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track,
.table-container::-webkit-scrollbar-track {
	background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb,
.table-container::-webkit-scrollbar-thumb {
	background-color: var(--border);
	border-radius: 10px;
}

.table-container {
	/* Ensures alignment remains even when vertical scrollbar appears */
	scrollbar-gutter: stable;
}

/* Mask specifically for the rows container to handle clipping at the header boundary */
.mask-top {
	mask-image: linear-gradient(to bottom, transparent 0, black 20px);
}
</style>
