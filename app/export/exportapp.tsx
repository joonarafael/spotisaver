"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { BeatLoader } from "react-spinners";

import getPlaylist from "@/actions/spotify/getplaylist";
import TrackList from "@/components/tracklist";
import { Button } from "@/components/ui/button";
import exportCSV from "@/lib/exportcsv";
import exportJSON from "@/lib/exportjson";
import exportSimplerCSV from "@/lib/simplerexportcsv";
import exportSimplerJSON from "@/lib/simplerexportjson";
import { Playlist, Track } from "@/types";

interface ExportAppProps {
	playlistId?: string;
}

const ExportApp = ({ playlistId }: ExportAppProps) => {
	const router = useRouter();
	const [header, setHeader] = useState<Playlist | null>(null);
	const [trackList, setTrackList] = useState<Track[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const retrieveData = async () => {
			if (!playlistId) {
				return;
			}

			const res = await getPlaylist(playlistId);

			if (res?.success) {
				setHeader(res.header);
				setTrackList(res.tracks);
			} else if (res?.error) {
				setError(res.error);
			}
		};

		retrieveData();
	}, [playlistId]);

	if (error.length > 0) {
		return (
			<div className="bg-foreground rounded-xl drop-shadow-lg p-4 flex flex-col gap-4">
				<h1 className="text-rose-500 font-bold text-2xl">{error}</h1>
				<p className="text-background">
					Make sure the given playlist ID/URL is correct.
				</p>
				<Button
					onClick={() => {
						router.push("/export");
					}}
					className="h-full font-light items-center gap-2"
					variant="destructive"
				>
					<p>CHOOSE ANOTHER PLAYLIST</p>
					<MdExitToApp className="w-4 h-4" />
				</Button>
			</div>
		);
	}

	if (!header) {
		return (
			<div className="flex flex-col gap-8 justify-center items-center">
				<h1>FETCHING & EXPORTING YOUR PLAYLIST...</h1>
				<BeatLoader color="silver" />
			</div>
		);
	}

	const overflow = trackList.length > 100;

	return (
		<div className="flex min-w-[80vw] gap-8 flex-col p-4 rounded-xl bg-background">
			<div className="flex w-full flex-col md:flex-row gap-4">
				<Button
					onClick={() => {
						window.open(
							header?.external_urls?.spotify ?? "https://open.spotify.com/",
							"_blank"
						);
					}}
					className="h-full items-center gap-2 w-full text-[#1DB954]"
				>
					<p>OPEN IN SPOTIFY</p>
					<FaExternalLinkSquareAlt className="w-4 h-4" />
				</Button>
				<Button
					onClick={() => {
						window.open("/export", "_self");
					}}
					className="h-full w-full items-center gap-2"
					variant="destructive"
				>
					<p>CHOOSE ANOTHER PLAYLIST</p>
					<MdExitToApp className="w-4 h-4" />
				</Button>
			</div>
			<div className="flex w-full items-end gap-4 flex-wrap pb-8 border-b border-[#1DB954]/50">
				{header.images && (
					<div className="rounded-xl bg-no-repeat w-[256px] h-[256px] overflow-hidden">
						<img
							className="w-full h-full object-cover"
							src={header?.images[0]?.url}
							alt="playlist image"
						/>
					</div>
				)}

				<div className="text-left flex flex-col gap-4">
					<h3 className="font-light text-2xl">{header.owner.display_name}</h3>
					<h1 className="text-7xl font-bold">{header.name}</h1>
					{header.description && (
						<h2 className="font-light">{header.description}</h2>
					)}
				</div>
			</div>
			<h1 className="text-lg">EXPORT AND DOWNLOAD</h1>
			<div className="flex w-full flex-col md:flex-row gap-4 items-center">
				<div className="min-w-20">JSON</div>
				<Button
					onClick={() => {
						exportSimplerJSON(trackList, header.name);
					}}
					className="h-full w-full gap-1"
				>
					<p>AS A</p>
					<p className="font-bold">JSON</p>
				</Button>
				<Button
					onClick={() => {
						exportJSON(trackList, header.name);
					}}
					className="h-full font-light w-full gap-1"
					variant="secondary"
				>
					<p className="font-bold">DETAILED</p>
					<p>AS A JSON</p>
				</Button>
			</div>
			<div className="flex w-full flex-col md:flex-row gap-4 pb-8 items-center border-b border-[#1DB954]/50">
				<div className="min-w-20">CSV</div>
				<Button
					onClick={() => {
						exportSimplerCSV(trackList, header.name);
					}}
					className="h-full w-full gap-1"
				>
					<p>AS A</p>
					<p className="font-bold">CSV</p>
				</Button>
				<Button
					onClick={() => {
						exportCSV(trackList, header.name);
					}}
					className="h-full font-light w-full gap-1"
					variant="secondary"
				>
					<p className="font-bold">DETAILED</p>
					<p>AS A CSV</p>
				</Button>
			</div>
			<div className="w-full text-left">
				<p className="text-base">
					{overflow && "first 100 tracks out of a "}
					{`total of ${header.track_count} tracks:`}
				</p>
			</div>
			<TrackList trackList={trackList} overflow={overflow} />
			{overflow && (
				<div className="flex flex-col text-center justify-center items-center gap-2">
					<h1 className="text-sm">
						Displaying only the first 100 songs of the playlist.
					</h1>
					<Button
						onClick={() => {
							window.open(
								header?.external_urls?.spotify ?? "https://open.spotify.com/",
								"_blank"
							);
						}}
						className="w-min font-light text-[#1DB954] items-center gap-2"
						variant="outline"
					>
						<p>VIEW FULL TRACK LIST IN SPOTIFY</p>
						<FaExternalLinkSquareAlt className="w-4 h-4" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default ExportApp;
