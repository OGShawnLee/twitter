<script lang="ts">
	import type { RuntimeTweet } from "@root/types";
	import { handleLikeTweet } from "@root/services/db";
	import { user } from "@root/state";

	export let tweet: RuntimeTweet;

	let isDisabled = false;
	let state: "IDLE" | "PROCESSING" = "IDLE";
	$: isFavourite = $user ? tweet.likedBy.includes($user.document.uid) : false;

	async function handleClick() {
		if (!$user || state === "PROCESSING") return;

		try {
			isDisabled = true;
			state = "PROCESSING";
			await handleLikeTweet({
				uid: $user.document.uid,
				tweet: { id: tweet.id, user: tweet.user, stats: tweet.stats },
				isFavourite
			});
		} catch (err) {
			// TODO: HANDLE ERROR
		} finally {
			state = "IDLE";
			isDisabled = false;
		}
	}
</script>

<slot {handleClick} {isDisabled} {isFavourite} />
