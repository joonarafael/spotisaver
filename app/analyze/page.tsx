import Container from "@/components/container";
import Title from "@/components/title";

import AnalyzeClient from "./analyzeclient";

const AnalyzePage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<AnalyzeClient />
			</div>
		</Container>
	);
};

export default AnalyzePage;
