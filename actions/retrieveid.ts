"use server";

import { PLAYLIST_ID, PLAYLIST_ID_FROM_URL_REGEX } from "@/constants/regex";

export default async function retrieveID(input: string) {
	if (!input || typeof input !== "string") {
		return null;
	}

	if (input.match(PLAYLIST_ID)) {
		return input;
	}

	const validInput = input.match(PLAYLIST_ID_FROM_URL_REGEX);

	return validInput ? validInput[1] : null;
}
