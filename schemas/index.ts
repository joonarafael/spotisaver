import * as z from "zod";

export const PlaylistSchema = z.object({
	term: z.string().min(1, {
		message: "Required field.",
	}),
});
