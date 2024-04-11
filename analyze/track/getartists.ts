import { Artist, Track } from '@/types';

export default function getArtists(track: Track) {
	let artists: Artist[] = [];

	const trackArtists = track.track.artists;

	for (const artist of trackArtists) {
		const extractedArtist: Artist = {
			id: artist.id,
			name: artist.name,
			external_urls: {
				spotify: artist.external_urls?.spotify
					? artist.external_urls.spotify
					: "",
			},
		};

		artists.push(extractedArtist);
	}

	return artists;
}
