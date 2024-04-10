"use client";

import { useRouter } from 'next/navigation';

const Footer = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col w-full text-center items-center justify-center my-12">
			<h1
				className="hover:underline cursor-pointer font-bold"
				onClick={() => {
					router.push("/");
				}}
			>
				SPOTISAVER
			</h1>
			<p className="font-light text-neutral-500">by Joona Kettunen</p>
			<h1
				className="hover:underline cursor-pointer"
				onClick={() => {
					window.open("https://github.com/joonarafael/spotisaver", "_blank");
				}}
			>
				GitHub
			</h1>
		</div>
	);
};

export default Footer;
