"use client";

import { FaSpotify } from "react-icons/fa";

const Title = () => {
	return (
		<div className="flex flex-row items-center text-[#1DB954] drop-shadow-md">
			<h1 className="text-4xl font-bold">SP</h1>
			<FaSpotify className="w-7 h-7" />
			<h1 className="text-4xl font-bold">TISAVER</h1>
		</div>
	);
};

export default Title;
