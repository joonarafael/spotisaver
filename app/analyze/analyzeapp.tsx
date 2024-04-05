"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import getPlaylist from "@/actions/spotify/getplaylist";
import TrackList from "@/components/tracklist";
import { Button } from "@/components/ui/button";

interface AnalyzeAppProps {
	playlistId?: string;
}

const AnalyzeApp = ({ playlistId }: AnalyzeAppProps) => {
	const router = useRouter();
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const retrieveData = async () => {
			if (!playlistId) {
				return;
			}

			const res = await getPlaylist(playlistId);

			if (res.success) {
				setData(res.data);
			} else if (res.error) {
				setError(res.error);
			}
		};

		retrieveData();
	}, [playlistId]);

	if (error.length > 0) {
		return (
			<div className="bg-background rounded-xl drop-shadow-lg p-4 flex flex-col gap-4">
				<h1 className="text-rose-500 font-bold text-2xl">{error}</h1>
				<p>Make sure the given playlist ID/URL is correct.</p>
				<Button
					onClick={() => {
						router.push("/export");
					}}
					className="h-full font-light"
					variant="destructive"
				>
					Choose another playlist
				</Button>
			</div>
		);
	}

	if (!data) {
		return (
			<div>
				<BeatLoader color="silver" />
			</div>
		);
	}

	const overflow = data.tracks.total > 100;

	return (
		<div className="flex min-w-[80vw] gap-6 flex-col p-4 bg-secondary rounded-xl drop-shadow-lg">
			<div className="flex w-full flex-row gap-4">
				<Button
					onClick={() => {
						window.open(data.external_urls.spotify, "_blank");
					}}
					className="h-full font-light w-full text-[#1DB954]"
					variant="outline"
				>
					Open this playlist in Spotify
				</Button>
				<Button
					onClick={() => {
						router.push("/analyze");
					}}
					className="h-full font-light w-full"
					variant="destructive"
				>
					Choose another playlist
				</Button>
			</div>
			<div className="flex w-full items-end gap-4 flex-wrap">
				<img
					className="rounded-xl"
					width="256"
					height="256"
					src={data.images[0].url}
					alt="playlist image"
				/>
				<div className="text-left flex flex-col gap-4">
					<h3 className="font-light text-2xl">{data.owner.display_name}</h3>
					<h1 className="text-6xl font-bold">{data.name}</h1>
					<h2 className="font-light">{data.description}</h2>
				</div>
			</div>
			<TrackList tracklist={data.tracks.items} overflow={overflow} />
			{overflow && (
				<div className="flex flex-col text-center justify-center items-center gap-2">
					<h1 className="text-sm">
						Displaying only the first 100 songs of the playlist.
					</h1>
					<Button
						onClick={() => {
							window.open(data.external_urls.spotify, "_blank");
						}}
						className="w-min font-light text-[#1DB954]"
						variant="outline"
					>
						Open this playlist in Spotify to view full track list!
					</Button>
				</div>
			)}
		</div>
	);
};

export default AnalyzeApp;
