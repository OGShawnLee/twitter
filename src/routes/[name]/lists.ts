import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ params: { name } }) => {
	return {
		status: 200,
		body: { name }
	};
};
