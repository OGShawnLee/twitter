import type { MessageDocument } from "@root/types";
import type { CollectionReference, QuerySnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { isValidImageFileType } from "$lib/predicate";
import { isString } from "malachite-ui/predicate";
import { isMessageDocument, isTweetDocument } from "$lib/predicate/db";

const STRING_MONTHS = Object.freeze({
	0: "Jan",
	1: "Feb",
	2: "Mar",
	3: "Apr",
	4: "May",
	5: "Jun",
	6: "Jul",
	7: "Aug",
	8: "Sep",
	9: "Oct",
	10: "Nov",
	11: "Dec"
});

export function filterSnapshot<T>(querySnapshot: QuerySnapshot, isCorrectType: Predicate<T>) {
	return querySnapshot.docs.reduce((acc, document) => {
		const data = document.data();
		if (isCorrectType(data)) acc.push(data);
		return acc;
	}, [] as Array<T>);
}

export function formatHour(date: Date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours % 12}:${zeroPad(minutes, 2)} ${hours < 12 ? "AM" : "PM"}`;
}

export function formatStatusDate(date: Date) {
	const day = date.getDate();
	const month = date.getMonth() as keyof typeof STRING_MONTHS;
	const year = date.getFullYear();
	return `${STRING_MONTHS[month]} ${day}, ${year}`;
}

export function generateMessageDocuments(query: QuerySnapshot) {
	return query.docs.reduce((messages, document) => {
		const data = document.data();
		if (isMessageDocument(data)) messages.push(data);
		return messages;
	}, [] as MessageDocument[]);
}

export function generateTweetDocuments(queryOrDocuments: QuerySnapshot) {
	return queryOrDocuments.docs.map((doc) => {
		const docData = doc.data();
		if (isTweetDocument(docData)) return docData;
		throw new TypeError("Invalid Tweet Document");
	});
}

export function getImageFilePathURL(file: File) {
	return new Promise<string>((resolve, reject) => {
		if (!isValidImageFileType(file.type)) return reject("Invalid Image File");

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = ({ target }) => {
			const imageResult = target?.result;
			if (isString(imageResult)) resolve(imageResult);
			else reject("Invalid Image");
		};
	});
}

export async function joinWithIDs<T>(
	collection: CollectionReference,
	ids: string[],
	predicate: (document: unknown) => document is T
) {
	const readList = ids.map((id) => getDoc(doc(collection, id)));
	const result = await Promise.all(readList);
	return result.map((document) => {
		const data = document.data();
		if (predicate(data)) return data;
		else throw new Error("Invalid Document Type");
	});
}

export function toRecord<T>(value: T, ...keys: string[]): Record<string, T> {
	return keys.reduce((acc, key) => {
		acc[key] = value;
		return acc;
	}, {} as Record<string, T>);
}

export function toUnderscore(str: string) {
	return str.trim().replace(/\s+/g, "_");
}

export class Time {
	private static MILLISECONDS_TO_SECONDS = 1000;
	private static MILLISECONDS_TO_MINUTES = 60000;
	private static MILLISECONDS_TO_HOURS = 3.6e6;
	private static MILLISECONDS_TO_DAYS = 8.64e7;
	private static MILLISECONDS_TO_YEARS = 3.154e10;

	static toSeconds(date = new Date()) {
		return date.valueOf() / this.MILLISECONDS_TO_SECONDS;
	}

	static toMinutes(date = new Date()) {
		return date.valueOf() / this.MILLISECONDS_TO_MINUTES;
	}

	static toHours(date = new Date()) {
		return date.valueOf() / this.MILLISECONDS_TO_HOURS;
	}

	static toDays(date = new Date()) {
		return date.valueOf() / this.MILLISECONDS_TO_DAYS;
	}

	static toYears(date = new Date()) {
		return date.valueOf() / this.MILLISECONDS_TO_YEARS;
	}

	static isCurrentMinute(then: Date, now = new Date()) {
		return this.toMinutes(now) - this.toMinutes(then) < 1;
	}

	static isCurrentHour(then: Date, now = new Date()) {
		return this.toHours(now) - this.toHours(then) < 1;
	}

	static isCurrentDay(then: Date, now = new Date()) {
		return this.toDays(now) - this.toDays(then) < 1;
	}

	static isCurrentYear(then: Date, now = new Date()) {
		return this.toYears(now) - this.toYears(then) < 1;
	}

	static getSecondDifference(then: Date, now = new Date()) {
		return this.toSeconds(now) - this.toSeconds(then);
	}

	static getMinuteDifference(then: Date, now = new Date()) {
		return this.toMinutes(now) - this.toMinutes(then);
	}

	static getHourDifference(then: Date, now = new Date()) {
		return this.toHours(now) - this.toHours(then);
	}

	private static getMessage(diff: number, timeUnit: string) {
		return `${diff.toFixed()} ${diff > 2 ? timeUnit + "s" : timeUnit} ago`;
	}

	static getTimeMessage(then: Date, now = new Date()) {
		if (this.isCurrentMinute(then, now))
			return this.getMessage(this.getSecondDifference(then, now), "second");

		if (this.isCurrentHour(then, now))
			return this.getMessage(this.getMinuteDifference(then, now), "minute");

		if (this.isCurrentDay(then, now))
			return this.getMessage(this.getHourDifference(then, now), "hour");

		return formatStatusDate(then);
	}
}

function zeroPad(num: number, places: number) {
	return num.toString().padStart(places, "0");
}
