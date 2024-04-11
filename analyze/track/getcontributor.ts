import { Contributor, Track } from "@/types";

export default function getContributor(track: Track) {
	const extractedContributor: Contributor = {
		id: track.added_by?.id ? track.added_by.id : "",
		external_urls: {
			spotify: track.added_by?.external_urls?.spotify
				? track.added_by.external_urls.spotify
				: "",
		},
	};

	return extractedContributor;
}
