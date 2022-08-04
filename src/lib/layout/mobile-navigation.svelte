<script>
	import { isLoggedIn } from "@root/state/user";

	let className = "justify-between";

	export { className as class };
</script>

{#if $isLoggedIn}
	<nav class="fixed bottom-0 inset-x-0 h-15 z-8 | bg-zinc-800">
		<ul class="max-w-md h-full w-full px-6 mx-auto | flex items-center {className} | text-32px">
			<slot />
		</ul>
	</nav>
{/if}
