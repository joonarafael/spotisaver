"use client";

interface ContainerProps {
	children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
	return (
		<div className="max-w-[1920px] flex mx-auto px-4 md:px-8 xl:px-20">
			{children}
		</div>
	);
};

export default Container;
