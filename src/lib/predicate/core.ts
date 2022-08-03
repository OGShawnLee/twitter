import { Timestamp } from "firebase/firestore";
import { isString } from "malachite-ui/predicate";

export function isStringOrNull(val: unknown): val is string | null {
	return isString(val) || val === null;
}

export function isTimestamp(val: unknown): val is Timestamp {
	return val instanceof Timestamp;
}
