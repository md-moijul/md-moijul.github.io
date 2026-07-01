<script setup lang="ts">
import { ref } from "vue";
import { type Project } from "@/assets/data";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-vue-next";
import { useStackFilter } from "@/composables/useStackFilter";

defineProps<{
	project: Project;
}>();

const { isStackActive, toggleStack } = useStackFilter();

const isExpanded = ref(false);
const toggleExpand = () => {
	isExpanded.value = !isExpanded.value;
};

const formatDate = (date?: Date) => {
	if (!date) return "—";
	return date.getFullYear();
};
</script>

<template>
	<div
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
				class="font-bold text-xl lg:text-base text-primary group-hover:text-primary/90 block break-normal"
				:title="project.name"
				>{{ project.name }}</span
			>
		</div>

		<!-- Description -->
		<div class="min-w-0 pr-8 text-muted-foreground text-sm">
			<p
				class="transition-all duration-300 cursor-pointer lg:hover:text-foreground"
				:class="
					isExpanded
						? 'line-clamp-none'
						: 'line-clamp-none lg:line-clamp-3'
				"
				@click="toggleExpand"
			>
				{{ project.desc }}
			</p>
		</div>

		<!-- Stack -->
		<div class="min-w-0 pr-4 overflow-hidden">
			<div
				class="flex gap-1.5 transition-all duration-300 flex-wrap overflow-hidden"
				:class="
					isExpanded
						? 'lg:max-h-none'
						: 'lg:max-h-[72px]'
				"
			>
				<Badge
					v-for="tech in project.stack"
					:key="tech"
					class="text-xs py-0 px-2 whitespace-nowrap shrink-0 cursor-pointer"
					:variant="isStackActive(tech) ? 'sparkly' : 'default'"
					@click="toggleStack(tech)"
				>
					{{ tech }}
				</Badge>
			</div>
		</div>

		<!-- Desktop Links (Hidden on Mobile) -->
		<div
			class="min-w-0 hidden lg:flex items-center justify-end gap-3 pr-4"
		>
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
</template>
