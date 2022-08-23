<script lang="ts">
	import { handleFollowUser } from "@root/services/db";
	import { isFollowingUser } from "$lib/predicate/db";
	import { user } from "@root/state";
	import { isBoolean } from "malachite-ui/predicate";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher<{ follow: void; unfollow: void }>();

	export let uid: string;
	export let isFollowing = false;

	let isDisabled = false;

	$: isStranger = $user?.account.uid !== uid;
	$: if ($user) loadIsFollowing($user.account.uid, uid);

	async function loadIsFollowing(uid: string, id: string) {
		const [isFollowed] = await isFollowingUser(uid, id);
		if (isFollowed) isFollowing = isFollowed;
	}

	async function handleFollow() {
		if (!$user || isDisabled) return;
		isDisabled = true;
		const { isFollowing: isFollower } = await handleFollowUser($user.account.uid, uid);
		if (isBoolean(isFollower)) {
			isFollowing = isFollower;
			if (isFollowing) {
				$user.document.stats.followingCount++;
				dispatch("follow");
			} else {
				$user.document.stats.followingCount--;
				dispatch("unfollow");
			}
		}
		isDisabled = false;
	}
</script>

{#if isStranger}
	<button
		class="h-9.5 px-6 | border-2 rounded-full text-sm font-medium {isFollowing
			? 'button--unfollow'
			: 'button--follow'}"
		disabled={isDisabled}
		class:opacity-50={isDisabled}
		on:click={handleFollow}
	>
		{isFollowing ? "Following" : "Follow"}
	</button>
{/if}

<style>
	.button--follow {
		@apply bg-white text-zinc-900 border-transparent;
	}

	.button--unfollow {
		@apply bg-transparent border-zinc-600;
	}
</style>
