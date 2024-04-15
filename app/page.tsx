"use client";

import Container from '@/components/container';
import PlaylistForm from '@/components/playlistform';
import Title from '@/components/title';

const HomePage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<h2 className="text-xl font-bold">
					ANALYZE AND EXPORT YOUR SPOTIFY PLAYLISTS
				</h2>
				<h1 className="text-2xl">{`LET'S CHECK YOUR PLAYLIST!`}</h1>
				<div className="flex flex-col gap-4 min-w-[320px] w-[40vw]">
					<PlaylistForm btnText="ANALYZE IT" redirectUrl="/analyze" />
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
