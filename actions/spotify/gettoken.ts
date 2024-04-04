"use server";

export default async function getToken() {
	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				btoa(
					process.env.SPOTIFY_API_CLIENT_ID +
						":" +
						process.env.SPOTIFY_API_CLIENT_SECRET
				),
		},
		body: "grant_type=client_credentials",
	});

	const data = await result.json();
	return data.access_token;
}
