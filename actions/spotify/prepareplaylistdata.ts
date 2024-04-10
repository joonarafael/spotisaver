"use server";

import { Playlist, SpotifyImage } from '@/types';

function generateImageList(input: any) {
	let imageList: SpotifyImage[] = [];

	for (let i = 0; i < input.length; i++) {
		let image = {
			height: input[i].height,
			url: input[i].url,
			width: input[i].width,
		};

		imageList.push(image);
	}

	return imageList;
}

export default async function generateSafePlaylist(input: any) {
	const safePlaylist: Playlist = {
		collaborative: input?.collaborative,
		description: input?.description,
		external_urls: {
			spotify: input?.external_urls?.spotify,
		},
		followers: {
			total: input?.followers?.total,
		},
		id: input.id,
		images: generateImageList(input.images),
		name: input.name,
		owner: {
			display_name: input?.owner?.display_name,
			external_urls: {
				spotify: input?.owner?.external_urls?.spotify,
			},
			id: input.owner.id,
			type: input?.owner?.type,
		},
		public: input.public,
		track_count: input.tracks.total,
	};

	return safePlaylist;
}
