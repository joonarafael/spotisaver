"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

import retrieveID from "@/actions/retrieveid";
import Container from "@/components/container";
import Loading from "@/components/loading";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ExportClient from "./client";

const ExportPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");
	const [isPending, startTransition] = useTransition();

	const [url, setUrl] = useState("");
	const [error, setError] = useState("");

	const onSubmit = () => {
		if (!url) {
			return;
		}

		startTransition(() => {
			setError("");

			retrieveID(url)
				.then((data) => {
					if (!data) {
						setError("Invalid ID/URL provided.");
						return;
					}

					router.push(`/export?listId=${data}`);
				})
				.catch((error) => {
					setError("Something went wrong!");
					console.log(error);
				});
		});
	};

	if (!listId) {
		return (
			<Suspense fallback={<Loading />}>
				<Container>
					<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
						<Title />
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl">{`EXPORT YOUR SPOTIFY PLAYLIST?`}</h1>
							<p>
								Give a proper URL to a specific Spotify playlist or the playlist
								ID.
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
								className="gap-2 items-center"
								disabled={url.length === 0}
								onClick={onSubmit}
							>
								<p>ANALYZE IT</p>
								<FaArrowCircleRight />
							</Button>
							{error && (
								<div className="bg-destructive/50 rounded-lg p-2">{error}</div>
							)}
						</div>
					</div>
				</Container>
			</Suspense>
		);
	}

	return (
		<Suspense fallback={<Loading />}>
			<Container>
				<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
					<Title />
					<div>
						<h1 className="text-2xl">{`EXPORT`}</h1>
					</div>
					<ExportClient playlistId={listId} />
				</div>
			</Container>
		</Suspense>
	);
};

export default ExportPage;
