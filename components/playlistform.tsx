"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleRight } from "react-icons/fa";
import * as z from "zod";

import retrieveID from "@/actions/retrieveid";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EXAMPLE_PLAYLIST } from "@/constants/examplelist";
import { PlaylistSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import FormError from "./formerror";

interface PlaylistFormProps {
	btnText: string;
	redirectUrl: string;
}

const PlaylistForm = ({ btnText, redirectUrl }: PlaylistFormProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof PlaylistSchema>>({
		resolver: zodResolver(PlaylistSchema),
		defaultValues: {
			term: "",
		},
	});

	const onSubmit = (values: z.infer<typeof PlaylistSchema>) => {
		setError("");

		startTransition(async () => {
			const playlistId = await retrieveID(values.term);

			if (playlistId) {
				router.push(`${redirectUrl}?listId=${playlistId}`);
			} else {
				setError("Invalid input.");
			}
		});
	};

	const showExample = async () => {
		form.setValue("term", `${EXAMPLE_PLAYLIST}`);

		onSubmit(form.getValues());
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="text-left space-y-4"
			>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="term"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-background">
									Playlist URL or ID:
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="https://open.spotify.com/playlist/..."
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage id={field.name} />
							</FormItem>
						)}
					/>
				</div>
				{error && <FormError message={error} />}
				<Button
					type="submit"
					variant="outline"
					className="w-full flex gap-2 items-center"
					disabled={isPending}
				>
					<p>{btnText}</p>
					<FaArrowCircleRight />
				</Button>
				<Button
					onClick={() => {
						showExample();
					}}
					variant="secondary"
					size="sm"
					className="w-full flex gap-2 items-center"
					disabled={isPending}
				>
					<p>GIVE ME AN EXAMPLE</p>
				</Button>
			</form>
		</Form>
	);
};

export default PlaylistForm;
