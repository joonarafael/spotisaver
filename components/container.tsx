"use client";

interface ContainerProps {
	children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
	return (
		<div className="max-w-[2520px] flex md:px-10 mx-auto px-4 xl:px-20">
			{children}
		</div>
	);
};

export default Container;
