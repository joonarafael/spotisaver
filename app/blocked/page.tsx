import Container from "@/components/container";
import Title from "@/components/title";

const BlockedPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
					<h1 className="text-2xl text-rose-500">{`YOU'VE BEEN RATELIMITED!`}</h1>
				</div>
			</div>
		</Container>
	);
};

export default BlockedPage;
