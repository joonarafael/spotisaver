"use client";

import { json2csv } from 'json-2-csv';

import { Track } from '@/types';

import filterFileName from './filterfilename';

export default function exportCSV(data: Track[], name: string) {
	try {
		const csv = json2csv(data);
		const blob = new Blob([csv], { type: "text/csv" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		const fileName = filterFileName(name);

		link.download = `${fileName}_tracklist.csv`;
		link.click();
	} catch (err) {
		console.log(err);
	}
}
