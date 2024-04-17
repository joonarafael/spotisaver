"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { RiFileDownloadFill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";

import getPlaylist from "@/actions/spotify/getplaylist";
import masterAnalyzeTracklist from "@/analyze/master";
import TrackList from "@/components/tracklist";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/dateformatting";
import { Playlist, Track } from "@/types";
import { AnalyzeData } from "@/types/analyze";

interface AnalyzeAppProps {
	playlistId?: string;
}

const AnalyzeApp = ({ playlistId }: AnalyzeAppProps) => {
	const router = useRouter();
	const [header, setHeader] = useState<Playlist | null>(null);
	const [trackList, setTrackList] = useState<Track[]>([]);
	const [error, setError] = useState("");
	const [analyze, setAnalyze] = useState<AnalyzeData | null>(null);

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
			<div className="flex flex-col gap-8 justify-center items-center">
				<h1>FETCHING & ANALYZING YOUR PLAYLIST...</h1>
				<BeatLoader color="silver" />
			</div>
		);
	}

	const overflow = trackList.length > 10;

	return (
		<div className="flex min-w-[80vw] gap-8 flex-col p-4 bg-primary/25 rounded-xl justify-center items-center text-lg">
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
						window.open("/analyze", "_self");
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
					<div className="rounded-xl bg-no-repeat w-[256px] h-[256px] overflow-hidden">
						<img
							width="256"
							height="256"
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
			<div className="flex w-full flex-col md:flex-row gap-4 items-center">
				<Button
					onClick={() => {
						router.push(`/export?listId=${playlistId}`);
					}}
					variant="outline"
					className="h-full w-full items-center gap-2"
				>
					<RiFileDownloadFill className="w-4 h-4" />
					<p>EXPORT THIS PLAYLIST</p>
				</Button>
				<Button
					onClick={() => {}}
					className="h-full font-light w-full"
					variant="ghost"
					disabled
				></Button>
			</div>
			<div className="flex w-full flex-col lg:flex-row gap-4 text-lg bg-background rounded-xl p-2">
				<div className="w-full">
					<div className="flex flex-row justify-between">
						<p className="font-light">playlist owner</p>
						<p className="font-bold">{header.owner.display_name}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">playlist contributors</p>
						<p className="font-bold">{analyze?.contributors.length}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">total amount of tracks</p>
						<p className="font-bold">{header.track_count}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">unique tracks</p>
						<p className="font-bold">{analyze?.unique_tracks}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">total amount of artists</p>
						<p className="font-bold">{analyze?.artists.length}</p>
					</div>
				</div>
				<div className="w-full">
					<div className="flex flex-row justify-between">
						<p className="font-light">playlist followers</p>
						<p className="font-bold">{header?.followers?.total}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">most additions</p>
						<p className="font-bold">{formatDate(analyze?.added_at_most)}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">first addition</p>
						<p className="font-bold">
							{formatDate(analyze?.added_ats[0].added_at)}
						</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">most recent addition</p>
						<p className="font-bold">
							{formatDate(
								analyze?.added_ats[analyze?.added_ats.length - 1].added_at
							)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex w-full flex-col lg:flex-row gap-4 text-lg bg-background rounded-xl p-2">
				<div className="w-full">
					<div className="flex flex-row justify-between">
						<p className="font-light">most contributions by (user id)</p>
						<p className="font-bold">{analyze?.contributor_most}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">most popular artist</p>
						<p className="font-bold">{analyze?.artist_most}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">explicit content</p>
						{analyze?.contains_explicit ? (
							<p className="font-bold text-rose-500">YES</p>
						) : (
							<p className="font-bold">none</p>
						)}
					</div>
				</div>
				<div className="w-full">
					<div className="flex flex-row justify-between">
						<p className="font-light">most tracks from year</p>
						<p className="font-bold">{analyze?.year_most}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">unique decades</p>
						<p className="font-bold">{analyze?.unique_decades}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">oldest song</p>
						<p className="font-bold">{analyze?.years[0].year}</p>
					</div>
					<div className="flex flex-row justify-between">
						<p className="font-light">youngest song</p>
						<p className="font-bold">
							{analyze?.years[analyze.years.length - 1].year}
						</p>
					</div>
				</div>
			</div>
			<div className="w-full text-left">
				<p>
					{overflow && "first 10 tracks out of a "}
					{`total of ${header.track_count} tracks:`}
				</p>
			</div>
			<TrackList tracklist={trackList} overflow={overflow} hideTen={overflow} />
			{overflow && (
				<div className="flex flex-col text-center justify-center items-center gap-2">
					<h1 className="text-sm">
						Displaying only the first 10 songs of the playlist.
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
