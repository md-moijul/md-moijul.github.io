<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useScrollSpy } from "@/composables/useScrollSpy";
import { useScrollTo } from "@/composables/useScrollTo";
import { LayoutGrid, X } from "lucide-vue-next";

const sectionIds = ["about", "experience", "projects", "contact"];
const route = useRoute();
const { activeSection } = useScrollSpy(sectionIds);
const { scrollToSection } = useScrollTo(activeSection);

const isOpen = ref(false);

const toggleMenu = () => {
	isOpen.value = !isOpen.value;
};

const handleNavClick = async (id: string) => {
	isOpen.value = false;
	await scrollToSection(id);
};
</script>

<template>
	<div class="md:hidden">
		<!-- FAB -->
		<button
			@click="toggleMenu"
			class="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border text-foreground transition-all duration-300 active:scale-95"
			:class="[
				isOpen ? 'rotate-90 border-transparent shadow-none' : 'rotate-0 border-border shadow-lg',
			]"
			aria-label="Toggle Menu"
		>
			<component :is="isOpen ? X : LayoutGrid" class="w-6 h-6" />
		</button>

		<!-- Backdrop Overlay -->
		<Transition name="fade">
			<div
				v-if="isOpen"
				@click="toggleMenu"
				class="fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px]"
			></div>
		</Transition>

		<!-- Menu Panel (Bottom Sheet) -->
		<Transition name="slide-up">
			<div
				v-if="isOpen"
				class="fixed bottom-0 left-0 right-0 z-40 w-full bg-background/95 backdrop-blur-xl border-t border-border rounded-t-3xl p-8 pb-32 shadow-2xl"
			>
				<nav class="flex flex-col items-center space-y-8">
					<a
						v-for="sectionId in sectionIds"
						:key="sectionId"
						href="#"
						@click.prevent="handleNavClick(sectionId)"
						class="font-sans font-medium tracking-widest uppercase text-base transition-all duration-300"
						:class="[
							route.path === '/' && activeSection === sectionId
								? 'text-foreground scale-110 font-bold'
								: 'text-muted-foreground',
						]"
					>
						<span
							v-if="route.path === '/' && activeSection === sectionId"
							class="mr-2"
							>[</span
						>
						{{ sectionId }}
						<span
							v-if="route.path === '/' && activeSection === sectionId"
							class="ml-2"
							>]</span
						>
					</a>
				</nav>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
	transform: translateY(100%);
}
</style>
