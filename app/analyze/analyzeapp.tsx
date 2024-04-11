"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { BeatLoader } from "react-spinners";

import getPlaylist from "@/actions/spotify/getplaylist";
import masterAnalyzeTracklist from "@/analyze/tracklist/master";
import TrackList from "@/components/tracklist";
import { Button } from "@/components/ui/button";
import { Playlist, Track } from "@/types";

interface AnalyzeAppProps {
	playlistId?: string;
}

const AnalyzeApp = ({ playlistId }: AnalyzeAppProps) => {
	const router = useRouter();
	const [header, setHeader] = useState<Playlist | null>(null);
	const [trackList, setTrackList] = useState<Track[]>([]);
	const [error, setError] = useState("");
	const [analyze, setAnalyze] = useState<any>(null);

	useEffect(() => {
		const retrieveData = async () => {
			if (!playlistId) {
				return;
			}

			const res = await getPlaylist(playlistId);

			if (res.success) {
				setHeader(res.header);
				setTrackList(res.tracks);

				const analyzing = await masterAnalyzeTracklist(res.tracks);
				setAnalyze(analyzing);
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
						router.push("/analyze");
					}}
					className="h-full font-light"
					variant="destructive"
				>
					Choose another playlist
				</Button>
			</div>
		);
	}

	if (!header) {
		return (
			<div>
				<BeatLoader color="silver" />
			</div>
		);
	}

	const overflow = trackList.length > 100;

	return (
		<div className="flex min-w-[80vw] gap-6 flex-col p-4 bg-secondary rounded-xl drop-shadow-lg">
			<div className="flex w-full flex-col md:flex-row gap-4">
				<Button
					onClick={() => {
						window.open(
							header?.external_urls?.spotify ?? "https://open.spotify.com/",
							"_blank"
						);
					}}
					className="items-center gap-2 h-full w-full text-[#1DB954]"
				>
					<p>OPEN IN SPOTIFY</p>
					<FaExternalLinkSquareAlt className="w-4 h-4" />
				</Button>
				<Button
					onClick={() => {
						router.push("/analyze");
					}}
					className="h-full w-full items-center gap-2"
					variant="destructive"
				>
					<p>CHOOSE ANOTHER PLAYLIST</p>
					<MdExitToApp className="w-4 h-4" />
				</Button>
			</div>
			<div className="flex w-full items-end gap-4 flex-wrap">
				{header.images && (
					<img
						className="rounded-xl"
						width="256"
						height="256"
						src={header?.images[0]?.url}
						alt="playlist image"
					/>
				)}

				<div className="text-left flex flex-col gap-4">
					<h3 className="font-light text-2xl">{header.owner.display_name}</h3>
					<h1 className="text-7xl font-bold">{header.name}</h1>
					{header.description && (
						<h2 className="font-light">{`'${header.description}'`}</h2>
					)}
				</div>
			</div>
			<div className="flex w-full flex-col md:flex-row gap-4 items-center">
				<Button
					onClick={() => {
						router.push(`/export?listId=${playlistId}`);
					}}
					variant="outline"
					className="h-full w-full"
				>
					EXPORT THIS PLAYLIST
				</Button>
				<Button
					onClick={() => {}}
					className="h-full font-light w-full"
					variant="outline"
					disabled
				>
					DISABLED
				</Button>
			</div>
			{JSON.stringify(analyze)}
			<div className="w-full text-left">
				<p>{header.track_count} tracks</p>
			</div>
			<TrackList tracklist={trackList} overflow={overflow} />
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
						className="w-min font-light text-[#1DB954] gap-2 items-center"
						variant="outline"
					>
						<p>VIEW FULL TRACKLIST IN SPOTIFY</p>
						<FaExternalLinkSquareAlt className="w-4 h-4" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default AnalyzeApp;
