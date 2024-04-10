"use client";

import { useSearchParams } from "next/navigation";

import PlaylistForm from "@/components/playlistform";

import ExportApp from "./exportapp";

const ExportClient = () => {
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");

	if (!listId) {
		return (
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<h1 className="text-2xl">{`EXPORT YOUR SPOTIFY PLAYLIST?`}</h1>
				<div className="flex flex-col gap-4 min-w-[320px] w-[40vw]">
					<PlaylistForm btnText={"FETCH PLAYLIST"} redirectUrl="/export" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
			<h1 className="text-2xl">{`EXPORT`}</h1>
			<ExportApp playlistId={listId} />
		</div>
	);
};

export default ExportClient;
