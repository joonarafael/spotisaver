"use client";

import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
	message: string;
}

const FormError = ({ message }: FormErrorProps) => {
	return (
		<div className="border border-rose-500 bg-rose-500/50 rounded-md flex flex-wrap gap-4 items-center p-2">
			<BsExclamationTriangle color="red" />
			<p className="text-white">{message}</p>
		</div>
	);
};

export default FormError;
