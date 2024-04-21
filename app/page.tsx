"use client";

import Container from '@/components/container';
import PlaylistForm from '@/components/playlistform';
import Title from '@/components/title';
import { Button } from '@/components/ui/button';

const HomePage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div className="group flex text-center flex-col gap-20 w-full justify-center items-center">
					<h2 className="text-2xl drop-shadow-none group-hover:drop-shadow-xl group-hover:text-[#1DB954] transition group-hover:duration-200 duration-1000">
						{`LET'S CHECK YOUR PLAYLIST!`}
					</h2>
					<div className="relative">
						<div className="absolute opacity-75 -inset-0.5 bg-gradient-to-r from-[#19ff69] to-foreground rounded-xl blur-xl group-hover:opacity-100 group-hover:rotate-3 rotate-0 group-hover:blur-2xl transition group-hover:duration-200 duration-1000"></div>
						<div className="relative flex flex-col gap-4 min-w-[320px] w-[40vw] bg-primary rounded-xl px-2 py-4 drop-shadow-md">
							<PlaylistForm btnText="ANALYZE IT" redirectUrl="/analyze" />
							<Button
								onClick={() => {
									window.open("/analyze/legend", "_self");
								}}
								variant="link"
								size="sm"
								className="w-full text-background"
							>
								WHAT WILL BE ANALYZED?
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
