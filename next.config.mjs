/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image-cdn-ak.spotifycdn.com",
				port: "",
				pathname: "/image/**",
			},
		],
	},
};

export default nextConfig;
