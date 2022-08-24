<script lang="ts">
	import { isEmpty, isNumber, isString } from "malachite-ui/predicate";
	import { slide } from "svelte/transition";

	export let id: string;
	export let label = id;
	export let icon: string | undefined = undefined;
	export let charCount: number | string | undefined = undefined;
	export let charLimit: number | string | undefined = undefined;
	export let error: string | null = null;
	export let success: string | null = null;
	export let fontWeight = "font-medium";

	$: className = `w-full h-full min-h-12 px-3 | bg-transparent outline-none ${fontWeight} placeholder-zinc-500`;
</script>

<div class="grid gap-4">
	<div class="grid gap-1.25">
		<div class="flex items-center justify-between">
			<label class="capitalize" for={id}>{label}</label>
			{#if isNumber(charCount) && isNumber(charLimit)}
				<span class="text-sm text-zinc-400">
					{charCount} / {charLimit}
				</span>
			{/if}
		</div>
		<div class="flex group | border-2 border-zinc-800 focus-within:border-white">
			{#if icon}
				<div class="w-12 min-w-12 h-12 | grid place-content-center | bg-zinc-800 text-sky-500">
					<i class="bx {icon} | text-2xl text-sky-500 group-focus-within:text-white" />
				</div>
			{/if}
			<!-- svelte-ignore invalid-html-attribute -->
			<slot {className} {id} />
		</div>
		{#if error}
			<div class="mt-3 | flex items-center gap-1.5" transition:slide|local>
				<i class="bx bx-error-circle | text-lg text-rose-500" />
				<span class="text-sm text-zinc-400"> {error} </span>
			</div>
		{/if}
		{#if success}
			<div class="mt-3 | flex items-center gap-1.5" transition:slide|local>
				<i class="bx bx-check-circle | text-lg text-lime-500" />
				<span class="text-sm text-zinc-400"> {success} </span>
			</div>
		{/if}
	</div>
</div>
