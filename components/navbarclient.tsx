"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { IoHome, IoInformationCircle, IoStatsChart } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

import { Button } from "@/components/ui/button";

const NavbarClient = () => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || typeof theme === "undefined") {
		return (
			<div className="flex justify-between gap-4 m-4">
				<div className="flex flex-wrap gap-4">
					<Button className="flex flex-row gap-2" variant="ghost" disabled>
						<p>Loading...</p>
					</Button>
					<Button className="flex flex-row gap-2" variant="ghost" disabled>
						<p>Loading...</p>
					</Button>
					<Button className="flex flex-row gap-2" variant="ghost" disabled>
						<p>Loading...</p>
					</Button>
				</div>
				<div>
					<Button className="flex flex-row gap-2" variant="ghost" disabled>
						<p>Loading...</p>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-between gap-4 m-4">
			<div className="flex flex-wrap gap-4">
				<Button
					className="flex flex-row gap-2"
					variant="secondary"
					onClick={() => {
						router.push("/");
					}}
				>
					<IoHome />
					<p>Home</p>
				</Button>
				<Button
					className="flex flex-row gap-2"
					variant="secondary"
					disabled
					onClick={() => {
						router.push("/");
					}}
				>
					<IoStatsChart />
					<p>Analyze</p>
				</Button>
				<Button
					className="flex flex-row gap-2"
					variant="secondary"
					disabled
					onClick={() => {
						router.push("/");
					}}
				>
					<IoInformationCircle className="w-5 h-5" />
					<p>About</p>
				</Button>
			</div>
			<div>
				{theme === "light" ? (
					<Button
						className="flex flex-row gap-2"
						variant="secondary"
						onClick={() => {
							setTheme("dark");
						}}
					>
						<BsMoonStars />
						<p>Dark Mode</p>
					</Button>
				) : (
					<Button
						className="flex flex-row gap-2"
						variant="secondary"
						onClick={() => {
							setTheme("light");
						}}
					>
						<MdOutlineWbSunny className="w-5 h-5" />
						<p>Light Mode</p>
					</Button>
				)}
			</div>
		</div>
	);
};

export default NavbarClient;
