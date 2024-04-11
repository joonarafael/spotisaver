import { Contributor, Track } from "@/types";
import { ContributorRecord } from "@/types/analyze";

export default async function getContributors(tracklist: Track[]) {
	let contributors: ContributorRecord[] = [];
	let seenIds: string[] = [];

	for (const track of tracklist) {
		if (track?.added_by?.id) {
			const extractedContributor: Contributor = {
				id: track.added_by.id,
				external_urls: {
					spotify: track.added_by.external_urls?.spotify,
				},
			};

			const seenIndex = seenIds.indexOf(extractedContributor.id);

			if (seenIndex !== -1) {
				const existingContributor = contributors[seenIndex];

				existingContributor.track_count += 1;

				contributors[seenIndex] = existingContributor;
			} else {
				contributors.push({
					contirubutor: extractedContributor,
					track_count: 1,
				});

				seenIds.push(extractedContributor.id);
			}
		}
	}

	return contributors;
}
