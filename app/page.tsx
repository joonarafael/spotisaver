"use client";

import { FaSpotify } from "react-icons/fa";

import Container from "@/components/container";
import { Input } from "@/components/ui/input";

export const HomePage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<div className="flex flex-row items-center">
					<h1 className="text-4xl font-bold">SP</h1>
					<FaSpotify className="w-7 h-7" />
					<h1 className="text-4xl font-bold">TISAVER</h1>
				</div>
				<div>
					<h1>{`LET'S CHECK YOUR PLAYLIST!`}</h1>
				</div>
				<div className="w-[400px]">
					<Input
						className="w-full"
						type="url"
						placeholder="https://open.spotify.com/playlist/..."
					/>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
