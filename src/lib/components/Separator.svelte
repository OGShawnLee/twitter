<script>
	import { clearString } from "malachite-ui/utils";

	let className = "";

	export { className as class };

	$: finalClass = clearString(`${className} flex items-center justify-center gap-4`);
</script>

<div class={finalClass} role="separator">
	<div class="w-full h-0.5 | bg-zinc-800 rounded-full" />
	<span class="text-lg font-semibold">or</span>
	<div class="w-full h-0.5 | bg-zinc-800 rounded-full" />
</div>
