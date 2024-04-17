"use client";

import Container from "@/components/container";
import Title from "@/components/title";

const AnalyzeLegendPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div>
					<h1 className="text-2xl">{`ANALYZE LEGEND`}</h1>
				</div>
				<div className="flex flex-col w-full max-w-[800px] bg-background text-foreground p-4 rounded-xl drop-shadow-xl">
					<div className="text-foreground/50 font-light pb-6">
						explanation for every analyzed feature
					</div>
					<div className="flex flex-col md:flex-row justify-between w-full border-y border-foreground/25 py-2">
						<p>field name</p>
						<p className="text-foreground/50">explanation</p>
					</div>
					<div className="flex flex-col gap-2 py-2">
						<div className="flex flex-col md:flex-row justify-between">
							<p>playlist owner</p>
							<p className="text-foreground/50">the official playlist owner</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>playlist contributors</p>
							<p className="text-foreground/50">
								total amount of individual playlist contributors
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>total amount of tracks</p>
							<p className="text-foreground/50">
								total amount of tracks (including duplicates)
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>unique tracks</p>
							<p className="text-foreground/50">
								total amount of unique tracks (checked by track ID)
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>total amount of artists</p>
							<p className="text-foreground/50">
								total amount of appearing artists (including all features)
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>playlist followers</p>
							<p className="text-foreground/50">
								total amount of playlist followers
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>most additions</p>
							<p className="text-foreground/50">
								date when most additions were made
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>first addition</p>
							<p className="text-foreground/50">
								date when the first (still remaining) track was added
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>most recent addition</p>
							<p className="text-foreground/50">
								date when the most recent (still remaining) track was added
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>most contributions by (user id)</p>
							<p className="text-foreground/50">
								Spotify user ID of the most contributing user (most additions)
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>most popular artist</p>
							<p className="text-foreground/50">
								artist with the highest amount of tracks in the playlist
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>explicit content</p>
							<p className="text-foreground/50">
								whether or not the playlist contains explicit content
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>most tracks from year</p>
							<p className="text-foreground/50">
								most popular release year for the tracks in the playlist
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>unique decades</p>
							<p className="text-foreground/50">
								total amount of included decades (song release years)
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>oldest song</p>
							<p className="text-foreground/50">
								release year for the earliest published song
							</p>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<p>youngest song</p>
							<p className="text-foreground/50">
								release year for the most recently published song
							</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default AnalyzeLegendPage;
