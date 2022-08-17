<script lang="ts">
	import { followUser } from "@root/services/db";
	import { isFollowingUser } from "$lib/predicate/db";
	import { user } from "@root/state";

	export let uid: string;
	export let isFollowing = false;

	let isDisabled = false;
	let failedIsFollowing = false;

	$: if ($user) loadIsFollowing($user.account.uid, uid);

	async function loadIsFollowing(uid: string, id: string) {
		const [isFollowed, error] = await isFollowingUser(uid, id);
		if (isFollowed) isFollowing = isFollowed;
		if (error) failedIsFollowing = true;
	}

	async function handleFollowUser() {
		if (!$user || $user.account.uid === uid || isFollowing || isDisabled || failedIsFollowing)
			return;
		try {
			isDisabled = true;
			await followUser($user.account.uid, uid);
			isFollowing = true;
		} catch (error) {
			// TODO: HANDLE ERROR
		} finally {
			isDisabled = false;
		}
	}
</script>

<button
	class="h-9.5 px-8 | border-2 rounded-full text-sm font-medium {isFollowing
		? 'button--unfollow'
		: 'button--follow'}"
	disabled={isDisabled}
	class:opacity-50={isDisabled}
	on:click={handleFollowUser}
>
	{isFollowing ? "Following" : "Follow"}
</button>

<style>
	.button--follow {
		@apply bg-white text-zinc-900 border-transparent;
	}

	.button--unfollow {
		@apply bg-transparent border-zinc-600;
	}
</style>
