import type { Writable } from "svelte/store";
import { isFunction, isInterface, isWritable } from "malachite-ui/predicate";
import { useContext } from "malachite-ui/hooks";

interface TweetContext {
	isBookmarked: Writable<boolean>;
	onDelete: (id: string) => void;
}

export const TweetContext = useContext({
	component: "tweet",
	predicate: (val): val is TweetContext =>
		isInterface<TweetContext>(val, {
			isBookmarked: isWritable,
			onDelete: isFunction
		})
});
