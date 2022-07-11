<script lang="ts">
	let className = "gap-4";

	export { className as class };
</script>

<header class="fixed top-0 inset-x-0 h-20 z-10 | flex items-center justify-center | bg-zinc-900/90">
	<div class="max-w-md w-full mx-auto px-6 | flex items-center {className}">
		<slot />
	</div>
</header>
