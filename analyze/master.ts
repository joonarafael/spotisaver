import { Track } from "@/types";
import {
	AddedAtRecord,
	ArtistRecord,
	ContributorRecord,
	YearRecord,
} from "@/types/analyze";

import getAddedAt from "./track/getaddedat";
import getArtists from "./track/getartists";
import getContributor from "./track/getcontributor";
import getYear from "./track/getyear";

export default async function masterAnalyzeTracklist(trackList: Track[]) {
	let contributors: ContributorRecord[] = [];
	let seenContributors: string[] = [];

	let artists: ArtistRecord[] = [];
	let seenArtists: string[] = [];

	let added_ats: AddedAtRecord[] = [];
	let seenAddedAts: string[] = [];

	let containsExplicit: boolean = false;

	let years: YearRecord[] = [];
	let seenYears: string[] = [];

	for (const track of trackList) {
		const contributor = getContributor(track);

		const seenContributorIndex = seenContributors.indexOf(contributor.id);

		if (seenContributorIndex === -1) {
			contributors.push({
				contirubutor: contributor,
				track_count: 1,
			});

			seenContributors.push(contributor.id);
		} else {
			const existingContributor = contributors[seenContributorIndex];

			existingContributor.track_count += 1;

			contributors[seenContributorIndex] = existingContributor;
		}

		const extractedArtists = getArtists(track);

		for (const artist of extractedArtists) {
			const seenArtistIndex = seenArtists.indexOf(artist.id);

			if (seenArtistIndex === -1) {
				artists.push({
					artist: artist,
					track_count: 1,
				});

				seenArtists.push(artist.id);
			} else {
				const existingArtist = artists[seenArtistIndex];

				existingArtist.track_count += 1;

				artists[seenArtistIndex] = existingArtist;
			}
		}

		const added_at = getAddedAt(track);

		const seenAddedAtIndex = seenAddedAts.indexOf(added_at);

		if (seenAddedAtIndex === -1) {
			added_ats.push({
				added_at: added_at,
				track_count: 1,
			});

			seenAddedAts.push(added_at);
		} else {
			const exisitingAddedAt = added_ats[seenAddedAtIndex];

			exisitingAddedAt.track_count += 1;

			added_ats[seenAddedAtIndex] = exisitingAddedAt;
		}

		if (track.track.explicit) {
			containsExplicit = true;
		}

		const year = getYear(track);

		const seenYearIndex = seenYears.indexOf(year);

		if (seenYearIndex === -1) {
			years.push({
				year: year,
				track_count: 1,
			});

			seenYears.push(year);
		} else {
			const existingYear = years[seenYearIndex];

			existingYear.track_count += 1;

			years[seenYearIndex] = existingYear;
		}
	}

	added_ats.sort((a, b) => b.track_count - a.track_count);

	const mostAddedAt = added_ats[0].added_at;

	added_ats.sort(
		(a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime()
	);

	contributors.sort((a, b) => b.track_count - a.track_count);

	artists.sort((a, b) => b.track_count - a.track_count);

	years.sort((a, b) => b.track_count - a.track_count);

	const mostYEar = years[0].year;

	years.sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime());

	return {
		contributors: contributors,
		contributor_most: contributors[0].contirubutor.id,
		artists: artists,
		artist_most: artists[0].artist.name,
		added_ats: added_ats,
		added_at_most: mostAddedAt,
		contains_explicit: containsExplicit,
		years: years,
		year_most: mostYEar,
	};
}
