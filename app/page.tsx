"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaArrowCircleRight, FaSpotify } from "react-icons/fa";

import retrieveID from "@/actions/retrieveid";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HomePage = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [url, setUrl] = useState("");

	const onSubmit = () => {
		if (!url) {
			return;
		}

		startTransition(() => {
			retrieveID(url)
				.then((data) => {
					if (!data) {
						return;
					}

					router.push(`/analyze?listId=${data}`);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};

	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<div className="flex flex-row items-center drop-shadow-md text-[#1DB954]">
					<h1 className="text-4xl font-bold">SP</h1>
					<FaSpotify className="w-7 h-7" />
					<h1 className="text-4xl font-bold">TISAVER</h1>
				</div>
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl">{`LET'S CHECK YOUR PLAYLIST!`}</h1>
					<p>
						Give a proper URL to a specific Spotify playlist or the playlist ID.
					</p>
				</div>
				<div className="flex flex-col gap-4 min-w-[320px] w-[40vw]">
					<Input
						className="w-full"
						type="url"
						placeholder="https://open.spotify.com/playlist/..."
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<Button
						variant="secondary"
						className="gap-2 items-center"
						disabled={url.length === 0}
						onClick={onSubmit}
					>
						<p>ANALYZE IT</p>
						<FaArrowCircleRight />
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
