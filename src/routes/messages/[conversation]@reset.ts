import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ params: { conversation } }) => {
	const members = conversation.split("-");
	if (members.length === 2) return { status: 200 };
	return { status: 302, headers: { location: "/messages" } };
};
