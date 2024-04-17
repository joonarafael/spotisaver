"use client";

import { useSearchParams } from "next/navigation";

import PlaylistForm from "@/components/playlistform";

import AnalyzeApp from "./analyzeapp";

const AnalyzeClient = () => {
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");

	if (!listId) {
		return (
			<div className="flex text-center flex-col gap-20 w-full justify-center items-center group">
				<h1 className="text-2xl drop-shadow-none group-hover:drop-shadow-xl group-hover:text-[#1DB954] transition group-hover:duration-200 duration-1000">{`WANT TO KNOW MORE ABOUT YOUR PLAYLIST?`}</h1>
				<div className="relative">
					<div className="absolute opacity-75 -inset-0.5 group-hover:rotate-3 rotate-0 bg-gradient-to-r from-[#19ff69] to-foreground rounded-xl blur-xl group-hover:opacity-100 group-hover:blur-2xl transition group-hover:duration-200 duration-1000"></div>
					<div className="relative flex flex-col gap-4 min-w-[320px] w-[40vw] bg-primary rounded-xl px-2 py-4 drop-shadow-md">
						<PlaylistForm btnText="LET'S CHECK IT" redirectUrl="/analyze" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
			<h1 className="text-2xl">{`ANALYZE`}</h1>
			<AnalyzeApp playlistId={listId} />
		</div>
	);
};

export default AnalyzeClient;
