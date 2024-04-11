"use client";

import { Track } from '@/types';

import filterFileName from './filterfilename';

export default function exportJSON(input: Track[], name: string) {
	try {
		const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify(input)
		)}`;

		const link = document.createElement("a");
		link.href = jsonString;

		const fileName = filterFileName(name);

		link.download = `${fileName}_detailed_tracklist.json`;

		link.click();
	} catch (err) {
		console.log(err);
	}
}
