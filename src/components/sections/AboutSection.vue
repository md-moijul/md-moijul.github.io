<template>
	<section id="about" class="py-10 min-h-screen">
		<h2 class="text-3xl font-bold mb-8">About Me</h2>
		<div class="space-y-6 text-md sm:text-xl leading-relaxed">
			<p v-reveal="{ stagger: true, delay: 200 }" class="opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">
				Welcome to my portfolio! I specialize in creating digital experiences
				that are not only functional but also visually appealing and accessible
				to all.
			</p>
			<p v-reveal="{ stagger: true, delay: 200 }" class="opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">
				My journey into the world of web development has been fueled by a
				passion for solving complex problems and bringing ideas to life through
				clean, efficient code.
			</p>
			<p v-reveal="{ stagger: true, delay: 200 }" class="opacity-0 -translate-x-5 transition-all duration-700 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0">
				Whether it's building responsive websites or solving real world
				problems, I am committed to delivering solutions that leave a lasting
				impact.
			</p>
		</div>
	</section>
</template>

<style scoped>
section {
}
</style>
