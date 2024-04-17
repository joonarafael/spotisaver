"use client";

import Container from "@/components/container";
import Title from "@/components/title";

const AboutPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div>
					<h1 className="text-2xl">{`ABOUT`}</h1>
				</div>
				<div className="flex flex-col gap-6 w-full max-w-[800px] bg-background text-foreground p-4 rounded-xl drop-shadow-xl">
					<div className="text-foreground/50 font-light">
						updated April 17th 2024
					</div>
					<div className="flex text-foreground/50 flex-wrap justify-between w-full gap-2 border-y border-foreground/25 py-2">
						<p
							className="hover:underline cursor-pointer"
							onClick={() => {
								window.open("https://github.com/joonarafael", "_blank");
							}}
						>
							built by Joona Kettunen
						</p>
						<p
							className="hover:underline cursor-pointer"
							onClick={() => {
								window.open(
									"https://github.com/joonarafael/spotisaver",
									"_blank"
								);
							}}
						>
							see source code on GitHub
						</p>
					</div>
					<div className="text-left flex flex-col gap-6">
						<p>
							A web application that allows you to analyze and export your
							Spotify playlists. Spotify playlists are fetched from the official
							Spotify API.
						</p>
						<p>
							<strong>
								Please note that only playlists may be analyzed and exported
							</strong>
							. No albums, podcasts or any other kind of media will get through
							the fetching and parsing process.
						</p>
						<p>
							Analyzing a playlist will provide you with many interesting
							insights. You may learn the most repeated artist of the playlist,
							oldest and youngest song, and more.
						</p>
						<p>
							In addition, you can export your playlists as JSON or CSV files.
							You may choose between a simpler data set, including only the
							names of the artists, albums and songs, or a more detailed data
							set, including more in-depth information about the included albums
							and e.g. the contributor of any given song.
						</p>
						<p>
							Originally I got the idea for the playlist exporting as I realized
							there was no way to export a playlist from Spotify.
							<br /> I wanted to have a backup of my playlists in case something
							would happen to my account.
						</p>
						<p>
							{`Analyzing the playlists was a natural addition to the project. The
							analyzing features are still under construction. Don't know yet how
							I'll expand this feature set.`}
						</p>
					</div>
					<div className="flex text-foreground/50 justify-center text-center w-full border-t border-foreground/25 pt-2">
						<p
							className="hover:underline cursor-pointer"
							onClick={() => {
								window.open("https://www.freepik.com/", "_blank");
							}}
						>
							Website favicon by Freepik
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default AboutPage;
