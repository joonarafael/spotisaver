import Container from "@/components/container";
import Title from "@/components/title";

const BlockedPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div>
					<h1 className="text-2xl text-rose-500">{`TOO MANY REQUESTS`}</h1>
				</div>
				<div className="flex flex-col gap-6 w-full max-w-[800px] bg-background p-4 rounded-xl drop-shadow-xl">
					<p className="font-light text-neutral-500">{`Slow down a bit, you just hit the rate limit! Bandwidth doesn't grow on trees.`}</p>
					<p>{`Please try to make your request again in a few moments.`}</p>
				</div>
			</div>
		</Container>
	);
};

export default BlockedPage;
