"use client";

import { useEffect, useState } from "react";

import getPlaylist from "@/actions/getplaylist";

interface ExportClientProps {
	playlistId?: string;
}

const ExportClient = ({ playlistId }: ExportClientProps) => {
	const [data, setData] = useState("");

	useEffect(() => {
		const retrieveData = async () => {
			if (!playlistId) {
				return;
			}

			const res = await getPlaylist(playlistId);

			if (res.success) {
				setData(res.success);
			} else {
				setData("no success");
			}
		};

		retrieveData();
	});

	return (
		<div>
			<div>Jaahas jaahas</div>
			<div>{playlistId}</div>
			<div>{data}</div>
		</div>
	);
};

export default ExportClient;
