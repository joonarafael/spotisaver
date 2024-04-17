"use server";

import { Artist, SpotifyImage, Track } from "@/types";

function generateArtistList(input: any) {
	let artistList: Artist[] = [];

	for (let i = 0; i < input.length; i++) {
		let artist = {
			external_urls: {
				spotify: input[i]?.external_urls?.spotify,
			},
			id: input[i]?.id,
			name: input[i]?.name,
			type: input[i]?.type,
		};

		artistList.push(artist);
	}

	return artistList;
}

function generateImageList(input: any) {
	let imageList: SpotifyImage[] = [];

	for (let i = 0; i < input.length; i++) {
		let image = {
			height: input[i]?.height,
			url: input[i]?.url,
			width: input[i]?.width,
		};

		imageList.push(image);
	}

	return imageList;
}

function generateSafeTrack(input: any) {
	try {
		const safeTrack: Track = {
			added_at: input?.added_at,
			added_by: {
				external_urls: {
					spotify: input?.added_by?.external_urls?.spotify,
				},
				id: input?.added_by?.id,
			},
			track: {
				album: {
					album_type: input?.track.album?.album_type,
					artists: generateArtistList(input?.track.album?.artists),
					external_urls: {
						spotify: input?.track?.album?.external_urls?.spotify,
					},
					id: input?.track?.album?.id,
					images: generateImageList(input?.track?.album?.images),
					name: input?.track?.album?.name,
					release_date: input?.track?.album?.release_date,
					release_date_precision: input?.track?.album?.release_date_precision,
					total_tracks: input?.track?.album?.total_tracks,
					type: input?.track?.album?.type,
				},
				artists: generateArtistList(input?.track?.artists),
				disc_number: input?.track?.disc_number,
				duration_ms: input?.track?.duration_ms,
				explicit: input?.track?.explicit,
				external_urls: {
					spotify: input?.track?.external_urls?.spotify,
				},
				id: input?.track?.id,
				name: input?.track?.name,
				popularity: input?.track?.popularity,
				track_number: input?.track?.track_number,
				type: input?.track?.type,
			},
		};

		return safeTrack;
	} catch (err) {
		const safeTrack: Track = {
			track: {
				album: {
					artists: [],
					id: "N/A",
					name: "N/A",
				},
				artists: [],
				id: "N/A",
				name: "N/A",
			},
		};

		return safeTrack;
	}
}

function convertToSafeTracks(input: any) {
	let safeTracks: Track[] = [];

	for (let i = 0; i < input.length; i++) {
		let safeTrack = generateSafeTrack(input[i]);

		safeTracks.push(safeTrack);
	}

	return safeTracks;
}

export default async function combineTrackList(data: any) {
	let trackList: Track[] = [];

	const firstChunk = convertToSafeTracks(data[0].tracks.items);

	trackList = [...firstChunk];

	let x = 1;

	while (x < data.length) {
		const chunk = data[x];

		const convertedChunk = convertToSafeTracks(chunk.items);

		trackList.push(...convertedChunk);

		x += 1;
	}

	return trackList;
}
