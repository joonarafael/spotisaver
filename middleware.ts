import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default async function middleware(request: NextRequest) {
	if (request.url.endsWith("/blocked")) {
		return NextResponse.next();
	}

	if (
		request.url.includes("/analyze?listId=") ||
		request.url.includes("/export?listId=")
	) {
		const ip = request.ip ?? "127.0.0.1";
		const { success, pending, limit, reset, remaining } = await ratelimit.limit(
			ip
		);

		return success
			? NextResponse.next()
			: NextResponse.redirect(new URL("/blocked", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
