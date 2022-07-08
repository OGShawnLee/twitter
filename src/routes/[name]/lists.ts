import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = ({ params: { name } }) => {
	return {
		status: 200,
		body: { name }
	};
};
