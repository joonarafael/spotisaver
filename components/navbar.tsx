"use client";

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsMoonStars } from 'react-icons/bs';
import { IoHome, IoInformationCircle } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import { RiFileDownloadFill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';

const Navbar = () => {
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
		<div className="fixed border-b-2 drop-shadow-sm w-full bg-background">
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
						onClick={() => {
							router.push("/export");
						}}
					>
						<RiFileDownloadFill className="w-5 h-5" />
						<p>Export</p>
					</Button>
					<Button
						className="flex flex-row gap-2"
						variant="secondary"
						onClick={() => {
							router.push("/about");
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
		</div>
	);
};

export default Navbar;
