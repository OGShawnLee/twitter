<script lang="ts">
	export let displayName: string | undefined | null = undefined;
	export let followingCount = 0;
	export let followerCount = 0;
</script>

<div class="flex items-center gap-3">
	<svelte:element
		this={displayName ? "a" : "div"}
		class="space-x-1 | outline-none text-xs border-b border-b-transparent"
		class:link={displayName}
		href={displayName ? `/${displayName}/following` : null}
	>
		<span class="font-medium">{followingCount}</span>
		<span class="text-zinc-400">Following</span>
	</svelte:element>
	<svelte:element
		this={displayName ? "a" : "div"}
		class="space-x-1 | outline-none text-xs border-b border-b-transparent"
		class:link={displayName}
		href={displayName ? `/${displayName}/followers` : null}
	>
		<span class="font-medium">{followerCount}</span>
		<span class="text-zinc-400">Followers</span>
	</svelte:element>
</div>

<style>
	.link {
		@apply hover:border-b-white focus:border-b-white;
	}
</style>
