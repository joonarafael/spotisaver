"use server";

import retrieveID from "../retrieveid";
import getToken from "./gettoken";

export default async function getPlaylist(input: string) {
	if (!input || typeof input !== "string") {
		return { error: "Invalid input!" };
	}

	const validatedInput = await retrieveID(input);

	if (!validatedInput) {
		return { error: "Invalid input!" };
	}

	const token = await getToken();
	let playlistData = [];

	try {
		let perform = true;
		let url = `https://api.spotify.com/v1/playlists/${validatedInput}`;

		while (perform) {
			const result = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			});

			if (result.status === 200) {
				const data = await result.json();

				playlistData.push(data);

				try {
					if (data.tracks.next) {
						url = data.tracks.next;
					} else {
						perform = false;
					}
				} catch (e) {
					try {
						if (data.next) {
							url = data.next;
						} else {
							perform = false;
						}
					} catch (e) {
						perform = false;
					}
				}
			} else {
				return { error: "Playlist fetching was unsuccessful." };
			}
		}

		return { success: "Playlist fetching successful.", data: playlistData };
	} catch (e) {
		console.log(e);
		return { error: "Playlist fetching was unsuccessful." };
	}
}
