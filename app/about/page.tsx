"use client";

import { FaSpotify } from "react-icons/fa";

import Container from "@/components/container";

export const AboutPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<div className="flex flex-row items-center text-[#1DB954] drop-shadow-md">
					<h1 className="text-4xl font-bold">SP</h1>
					<FaSpotify className="w-7 h-7" />
					<h1 className="text-4xl font-bold">TISAVER</h1>
				</div>
				<div>
					<h1 className="text-2xl">{`ABOUT`}</h1>
				</div>
				<div>N/A</div>
			</div>
		</Container>
	);
};

export default AboutPage;
