"use client";

import { useSearchParams } from "next/navigation";
import { FaSpotify } from "react-icons/fa";

import Container from "@/components/container";
import { Input } from "@/components/ui/input";

export const ExportPage = () => {
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");

	if (!listId) {
		return (
			<Container>
				<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
					<div className="flex flex-row items-center text-[#1DB954] drop-shadow-md">
						<h1 className="text-4xl font-bold">SP</h1>
						<FaSpotify className="w-7 h-7" />
						<h1 className="text-4xl font-bold">TISAVER</h1>
					</div>
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl">{`EXPORT YOUR SPOTIFY PLAYLIST?`}</h1>
						<p>
							Give a proper URL to a specific Spotify playlist or the playlist
							ID.
						</p>
					</div>
					<div className="min-w-[320px] w-[40vw]">
						<Input
							className="w-full"
							type="url"
							placeholder="https://open.spotify.com/playlist/..."
						/>
					</div>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<div className="flex flex-row items-center">
					<h1 className="text-4xl font-bold">SP</h1>
					<FaSpotify className="w-7 h-7" />
					<h1 className="text-4xl font-bold">TISAVER</h1>
				</div>
				<div>
					<h1 className="text-2xl">{`EXPORT`}</h1>
				</div>
				<div>{listId}</div>
			</div>
		</Container>
	);
};

export default ExportPage;
