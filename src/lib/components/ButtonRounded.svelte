<script>
	let className = "";

	export { className as class };
	export let backgroundColor = "bg-zinc-800";
</script>

<button class="h-12 w-12 min-w-12 | rounded-full {backgroundColor} {className}" on:click>
	<slot />
</button>
