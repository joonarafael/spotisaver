"use server";

import retrieveID from "./retrieveid";

export default async function getPlaylist(input: string) {
	if (!input || typeof input !== "string") {
		return { error: "Invalid input!" };
	}

	const validatedInput = await retrieveID(input);

	if (!validatedInput) {
		return { error: "Invalid input!" };
	}

	return { success: "Input is valid." };
}
