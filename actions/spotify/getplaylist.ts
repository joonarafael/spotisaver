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

	try {
		const result = await fetch(
			`https://api.spotify.com/v1/playlists/${validatedInput}`,
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

		if (result.status === 200) {
			const data = await result.json();

			return { success: "Playlist fetching successful.", data: data };
		}

		return { error: "Playlist fetching was unsuccessful." };
	} catch (e) {
		return { error: "Playlist fetching was unsuccessful." };
	}
}
