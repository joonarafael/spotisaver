"use client";

import { useSearchParams } from "next/navigation";

import PlaylistForm from "@/components/playlistform";

import AnalyzeApp from "./analyzeapp";

const AnalyzeClient = () => {
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");

	if (!listId) {
		return (
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<h1 className="text-2xl">{`WANT TO KNOW MORE ABOUT YOUR PLAYLIST?`}</h1>
				<div className="flex flex-col gap-4 min-w-[320px] w-[40vw]">
					<PlaylistForm btnText={"LET'S CHECK IT"} redirectUrl="/analyze" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
			<h1 className="text-2xl">{`ANALYZING YOUR PLAYLIST`}</h1>
			<AnalyzeApp playlistId={listId} />
		</div>
	);
};

export default AnalyzeClient;
