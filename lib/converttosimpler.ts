"use client";

import { Artist, SimplerTrack, Track } from "@/types";

function generateArtistList(artistList: Artist[]) {
	let artists: string[] = [];

	for (let i = 0; i < artistList.length; i++) {
		artists.push(artistList[i].name);
	}

	return artists;
}

function generateSimplerTrack(input: Track) {
	const simplerTrack: SimplerTrack = {
		album: input.track.album.name,
		release_date: input.track.album.release_date,
		artists: generateArtistList(input.track.artists),
		id: input.track.id,
		name: input.track.name,
	};

	return simplerTrack;
}

export default async function convertToSimplerTrackList(data: Track[]) {
	let tracklist: SimplerTrack[] = [];

	let x = 0;

	while (x < data.length) {
		const fullTrack = data[x];

		const convertedTrack = generateSimplerTrack(fullTrack);

		tracklist.push(convertedTrack);

		x += 1;
	}

	return tracklist;
}
