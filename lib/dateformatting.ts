function getDaySuffix(day: number) {
	if (day >= 11 && day <= 13) {
		return "th";
	}

	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

export default function formatDate(dateString: string | undefined) {
	if (!dateString) {
		return "";
	}

	const date = new Date(dateString);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	const monthName = months[month];

	const daySuffix = getDaySuffix(day);

	return monthName + " " + day + daySuffix + " " + year;
}
