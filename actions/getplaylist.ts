"use server";

import { PLAYLIST_URL_REGEX } from "@/constants/regex";

export default async function getPlaylist(URL: string) {
	if (!URL || typeof URL !== "string") {
		return null;
	}

	const validInput = URL.match(PLAYLIST_URL_REGEX);

	return validInput;
}
