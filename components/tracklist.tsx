"use client";

import { Track } from "@/types";

interface TrackListProps {
	tracklist: Track[];
}

const TrackList = ({ tracklist }: TrackListProps) => {
	console.log(tracklist);
	return (
		<div className="flex flex-col gap-4 w-full">
			{tracklist.map((track, index) => {
				const artistListLength = track.track?.artists?.length ?? 0;

				return (
					<div
						key={index}
						className="bg-background border rounded-xl p-2 drop-shadow-md flex flex-wrap items-center gap-2 justify-between"
					>
						<div className="flex flex-wrap items-center">
							<div className="min-w-10 font-light text-sm text-center">
								{index + 1}
							</div>
							<div className="text-left">
								<h1
									onClick={() => {
										if (track.track?.external_urls) {
											window.open(
												track.track?.external_urls.spotify ??
													"https://open.spotify.com/",
												"_blank"
											);
										}
									}}
									className="font-bold hover:underline cursor-pointer"
								>
									{track.track?.name ?? "N/A"}
								</h1>
								<div className="flex flex-wrap gap-1">
									{track.track?.artists?.map((artist, index) => {
										if (index === artistListLength - 1) {
											return (
												<div key={index} className="text-left">
													<h1
														onClick={() => {
															if (artist.external_urls) {
																window.open(
																	artist.external_urls.spotify ??
																		"https://open.spotify.com/",
																	"_blank"
																);
															}
														}}
														className="font-light hover:underline cursor-pointer"
													>
														{artist.name}
													</h1>
												</div>
											);
										}
										return (
											<div key={index} className="text-left">
												<h1
													onClick={() => {
														if (artist.external_urls) {
															window.open(
																artist.external_urls.spotify ??
																	"https://open.spotify.com/",
																"_blank"
															);
														}
													}}
													className="font-light hover:underline cursor-pointer"
												>
													{artist.name},{" "}
												</h1>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="text-right">
							<h1
								onClick={() => {
									if (track.track?.album?.external_urls) {
										window.open(
											track.track?.album?.external_urls.spotify ??
												"https://open.spotify.com/",
											"_blank"
										);
									}
								}}
								className="hover:underline cursor-pointer"
							>
								<em>{track.track?.album?.name ?? "N/A"}</em>
							</h1>
							<h2 className="font-light">
								{track.track?.album?.release_date ?? "N/A"}
							</h2>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TrackList;
