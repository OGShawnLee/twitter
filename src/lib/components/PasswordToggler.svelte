<script lang="ts">
	export let isShowingPassword: boolean;

	$: className = isShowingPassword
		? "text-amber-500 focus:text-amber-400"
		: "text-zinc-500 focus:text-white";
</script>

<button
	class="w-12 min-w-12 h-12 | outline-none {className}"
	type="button"
	on:click={() => (isShowingPassword = !isShowingPassword)}
>
	<i class="bx bx-show | text-2xl" />
</button>
