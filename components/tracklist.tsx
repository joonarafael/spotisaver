"use client";

import { Track } from "@/types";

interface TrackListProps {
	tracklist: Track[];
	hideTen?: boolean | null;
	overflow: boolean;
}

const OPACITY_TABLE = [
	"opacity-10",
	"opacity-20",
	"opacity-30",
	"opacity-40",
	"opacity-50",
	"opacity-60",
	"opacity-70",
	"opacity-80",
	"opacity-90",
	"opacity-100",
];

const TrackList = ({ tracklist, hideTen, overflow }: TrackListProps) => {
	let finalArray: Track[] = tracklist;

	if (hideTen && finalArray.length > 10) {
		finalArray = finalArray.slice(0, 10);
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-left text-sm font-light">Tracklist:</h1>
			<div className="flex flex-col gap-4 w-full">
				{finalArray.map((track, index) => {
					const artistListLength = track.track?.artists?.length ?? 0;

					let opacity = "opacity-100";

					if (overflow && index > finalArray.length - 11) {
						opacity = OPACITY_TABLE[finalArray.length - index - 1];
					}

					return (
						<div key={index} className={opacity}>
							<div
								className={`bg-background border rounded-xl p-2 drop-shadow-md flex flex-wrap items-center gap-2 justify-between`}
							>
								<div className="flex flex-wrap items-center gap-4">
									<div className="min-w-14 font-light text-sm text-center bg-secondary p-4 rounded-xl">
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
								<div className="text-right md:visible lg:visible xl:visible 2xl:visible collapse">
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
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TrackList;
