<script lang="ts">
	export let followingCount = 0;
	export let followerCount = 0;
</script>

<div class="flex items-center gap-3">
	<div class="space-x-1 | text-xs">
		<span class="font-medium">{followingCount}</span>
		<span class="text-zinc-400">Following</span>
	</div>
	<div class="space-x-1 | text-xs">
		<span class="font-medium">{followerCount}</span>
		<span class="text-zinc-400">Followers</span>
	</div>
</div>
