import { Track } from "@/types";

export default function getAddedAt(track: Track) {
	if (track.added_at) {
		const addedAt = track.added_at.toString();
		const date = new Date(addedAt);

		const formattedDate = date.toISOString().substring(0, 10);

		return formattedDate;
	}

	return "";
}
