import Container from "@/components/container";
import Title from "@/components/title";

import ExportClient from "./exportclient";

const ExportPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<ExportClient />
			</div>
		</Container>
	);
};

export default ExportPage;
