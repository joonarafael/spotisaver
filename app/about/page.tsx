"use client";

import Container from "@/components/container";
import Title from "@/components/title";

export const AboutPage = () => {
	return (
		<Container>
			<div className="flex text-center flex-col gap-12 w-full justify-center items-center">
				<Title />
				<div>
					<h1 className="text-2xl">{`ABOUT`}</h1>
				</div>
				<div>N/A</div>
			</div>
		</Container>
	);
};

export default AboutPage;
