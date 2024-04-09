"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import getPlaylist from "@/actions/spotify/getplaylist";
import TrackList from "@/components/tracklist";
import { Button } from "@/components/ui/button";
import { Track } from "@/types";

import combineTrackList from "../client/combinetracklist";

interface ExportAppProps {
	playlistId?: string;
}

const ExportApp = ({ playlistId }: ExportAppProps) => {
	const router = useRouter();
	const [data, setData] = useState<any>(null);
	const [trackList, setTrackList] = useState<Track[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const retrieveData = async () => {
			if (!playlistId) {
				return;
			}

			const res = await getPlaylist(playlistId);

			setTrackList(combineTrackList(res.data));

			if (res.success) {
				setData(res.data[0]);
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

	const overflow = data.tracks.total > 10;

	const exportJSON = () => {
		try {
			const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(trackList)
			)}`;

			const link = document.createElement("a");
			link.href = jsonString;
			link.download = `${data.name}_tracklist.json`;

			link.click();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex min-w-[80vw] gap-6 flex-col p-4 bg-secondary rounded-xl drop-shadow-lg">
			<div className="flex w-full flex-col md:flex-row gap-4">
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
						router.push("/export");
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
			<div className="flex flex-col gap-4 p-4 bg-background rounded-xl">
				<div className="flex w-full flex-col md:flex-row gap-4 items-center">
					<div className="min-w-20">JSON</div>
					<Button
						onClick={() => {
							exportJSON();
						}}
						className="h-full font-light w-full"
					>
						Export detailed tracklist as JSON
					</Button>
					<Button
						onClick={() => {}}
						className="h-full font-light w-full"
						variant="outline"
						disabled
					>
						Export simplified tracklist as JSON
					</Button>
				</div>
				<div className="flex w-full flex-col md:flex-row gap-4 items-center">
					<div className="min-w-20">EXCEL</div>
					<Button
						onClick={() => {}}
						className="h-full font-light w-full"
						disabled
					>
						Export detailed tracklist as EXCEL
					</Button>
					<Button
						onClick={() => {}}
						className="h-full font-light w-full"
						variant="outline"
						disabled
					>
						Export simplified tracklist as EXCEL
					</Button>
				</div>
			</div>
			<TrackList
				tracklist={data.tracks.items}
				hideTen={overflow}
				overflow={overflow}
			/>
			{overflow && (
				<div className="flex flex-col text-center justify-center items-center gap-2">
					<h1 className="text-sm">
						Displaying only the first 10 songs of the playlist.
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

export default ExportApp;
