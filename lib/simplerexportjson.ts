"use client";

import { Track } from "@/types";

import convertToSimplerTrackList from "./converttosimpler";
import filterFileName from "./filterfilename";

export default async function exportSimplerJSON(input: Track[], name: string) {
	try {
		const simplifiedData = await convertToSimplerTrackList(input);

		const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify(simplifiedData)
		)}`;

		const link = document.createElement("a");
		link.href = jsonString;

		const fileName = filterFileName(name);

		link.download = `${fileName}_simplified_tracklist.json`;

		link.click();
	} catch (err) {
		console.log(err);
	}
}
