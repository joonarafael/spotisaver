import { Track } from "@/types";

export default function getYear(track: Track) {
	if (track.track.album.release_date) {
		return track.track.album.release_date.toString().substring(0, 4);
	}

	return "";
}
