<script>
	let className = "";

	export { className as class };
	export let backgroundColor = "bg-zinc-800";
	export let size = "h-12 w-12 min-w-12";
</script>

<button class="{size} | rounded-full {backgroundColor} {className}" on:click>
	<slot />
</button>
