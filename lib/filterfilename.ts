export default function filterFileName(str: string) {
	return str.replace(/([^a-z0-9]+)/gi, "_");
}
