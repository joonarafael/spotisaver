"use client";

import { Track } from "@/types";

interface TrackListProps {
	trackList: Track[];
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

const TrackList = ({ trackList, hideTen, overflow }: TrackListProps) => {
	let finalArray: Track[] = trackList;

	if (finalArray.length > 100) {
		finalArray = finalArray.slice(0, 100);
	}

	if (hideTen && finalArray.length > 10) {
		finalArray = finalArray.slice(0, 10);
	}

	return (
		<div className="flex flex-col gap-4 w-full text-base">
			{finalArray.map((track, index) => {
				const artistListLength = track.track?.artists?.length ?? 0;

				let opacity = "opacity-100";

				if (overflow && index > finalArray.length - 11) {
					opacity = OPACITY_TABLE[finalArray.length - index - 1];
				}

				return (
					<div key={index} className={opacity}>
						<div
							className={`bg-background flex border rounded-xl p-2 drop-shadow-sm items-center justify-between`}
						>
							<div className="flex items-center">
								<div className="min-w-10 font-light text-sm text-center md:block hidden">
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
										{track.track.id === "N/A"
											? "processing of this song failed"
											: `${track.track.name}`}
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
							<div className="text-right md:block hidden">
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
									{track.track?.album?.release_date?.toString() ?? "N/A"}
								</h2>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TrackList;
