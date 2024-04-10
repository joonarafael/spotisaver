"use client";

import { json2csv } from "json-2-csv";

import { Track } from "@/types";

import convertToSimplerTrackList from "./converttosimpler";
import filterFileName from "./filterfilename";

export default async function exportSimplerCSV(data: Track[], name: string) {
	try {
		const simplifiedData = await convertToSimplerTrackList(data);

		const csv = json2csv(simplifiedData);
		const blob = new Blob([csv], { type: "text/csv" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		const fileName = filterFileName(name);

		link.download = `${fileName}_simplified_tracklist.csv`;
		link.click();
	} catch (err) {
		console.log(err);
	}
}
