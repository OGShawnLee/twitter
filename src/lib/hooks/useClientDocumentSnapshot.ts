import type { DocumentData, DocumentReference, FirestoreError } from "firebase/firestore";
import type { Readable, Writable } from "svelte/store";
import { onSnapshot } from "firebase/firestore";
import { writable } from "svelte/store";
import { makeReadable } from "malachite-ui/utils";

export function useClientDocumentSnapshot<T>(configuration: {
	ref: DocumentReference;
	initialValue: T;
	isCorrectType: Predicate<T>;
	useMutation?: (value: DocumentData | undefined) => T | void;
}): {
	subscribe: Writable<T>["subscribe"];
	data: Readable<T>;
	error: Readable<FirestoreError | string | null>;
} {
	const { ref, initialValue, isCorrectType, useMutation } = configuration;

	const Error = writable<FirestoreError | string | null>(null);
	const Data = writable(initialValue, (set) => {
		return onSnapshot(ref, {
			next: (documentSnapshot) => {
				let data = documentSnapshot.data();
				if (useMutation) {
					const updatedData = useMutation(data);
					if (isCorrectType(updatedData)) data = updatedData;
				}
				if (isCorrectType(data)) {
					Error.set(null);
					set(data);
				} else Error.set("Invalid Document Type");
			},
			error: Error.set
		});
	});

	return { subscribe: Data.subscribe, data: makeReadable(Data), error: makeReadable(Error) };
}
