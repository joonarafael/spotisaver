import { Track } from "@/types";

import getContributors from "./getcontributors";

export default async function masterAnalyzeTracklist(tracklist: Track[]) {
	const contributors = await getContributors(tracklist);

	return {
		contributors: contributors,
	};
}
