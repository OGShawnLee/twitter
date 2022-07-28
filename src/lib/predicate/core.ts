import { isString } from "malachite-ui/predicate";

export function isStringOrNull(val: unknown): val is string | null {
	return isString(val) || val === null;
}
