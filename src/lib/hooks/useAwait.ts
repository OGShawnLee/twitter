export async function useAwait<T, E = unknown>(
	promise: () => Promise<T> | T
): Promise<[result: T | null, error: E | null]> {
	try {
		const result = await promise();
		return [result, null];
	} catch (error) {
		return [null, error as E];
	}
}
