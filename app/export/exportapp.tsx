"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

import getPlaylist from '@/actions/spotify/getplaylist';
import TrackList from '@/components/tracklist';
import { Button } from '@/components/ui/button';
import exportCSV from '@/lib/exportcsv';
import exportJSON from '@/lib/exportjson';
import exportSimplerCSV from '@/lib/simplerexportcsv';
import exportSimplerJSON from '@/lib/simplerexportjson';
import { Playlist, Track } from '@/types';

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

			if (res.success) {
				setHeader(res.header);
				setTrackList(res.tracks);
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
		<div className="flex min-w-[80vw] gap-8 flex-col p-4 bg-primary/25 rounded-xl">
			<div className="flex w-full flex-col md:flex-row gap-4">
				<Button
					onClick={() => {
						window.open(
							header?.external_urls?.spotify ?? "https://open.spotify.com/",
							"_blank"
						);
					}}
					className="h-full font-bold w-full text-[#1DB954]"
				>
					OPEN IN SPOTIFY
				</Button>
				<Button
					onClick={() => {
						router.push("/export");
					}}
					className="h-full w-full"
					variant="destructive"
				>
					CHOOSE ANOTHER PLAYLIST
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
						<h2 className="font-light">{header.description}</h2>
					)}
				</div>
			</div>
			<div className="flex w-full flex-col md:flex-row gap-4 items-center">
				<div className="min-w-20">JSON</div>
				<Button
					onClick={() => {
						exportSimplerJSON(trackList, header.name);
					}}
					className="h-full font-bold w-full"
				>
					JSON EXPORT
				</Button>
				<Button
					onClick={() => {
						exportJSON(trackList, header.name);
					}}
					className="h-full font-light w-full"
					variant="outline"
				>
					JSON EXPORT DETAILED
				</Button>
			</div>
			<div className="flex w-full flex-col md:flex-row gap-4 items-center">
				<div className="min-w-20">CSV</div>
				<Button
					onClick={() => {
						exportSimplerCSV(trackList, header.name);
					}}
					className="h-full font-bold w-full"
				>
					CSV EXPORT
				</Button>
				<Button
					onClick={() => {
						exportCSV(trackList, header.name);
					}}
					className="h-full font-light w-full"
					variant="outline"
				>
					CSV EXPORT DETAILED
				</Button>
			</div>
			<div className="w-full text-left">
				<p>
					{overflow && "first 10 tracks out of a "}
					{`total of ${header.track_count} tracks:`}
				</p>
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
						className="w-min font-light text-[#1DB954] items-center gap-2"
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

export default ExportApp;
