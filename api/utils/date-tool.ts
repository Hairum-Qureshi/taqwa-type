function daysFromNow(localDateString: string): number {
	// Remove the timezone description (e.g., "(Eastern Daylight Time)")
	const cleanedDateString = localDateString.replace(/\s*\(.*?\)\s*$/, "");

	// Parse the cleaned date string
	const pastDate = new Date(cleanedDateString);

	// Check if the date is valid
	if (isNaN(pastDate.getTime())) {
		console.error("Invalid date format");
		return NaN; // or handle the error as appropriate
	}

	// Get the current date in UTC
	const currentDate = new Date();

	// Convert both dates to UTC timestamps for comparison
	const pastDateUTC = Date.UTC(
		pastDate.getUTCFullYear(),
		pastDate.getUTCMonth(),
		pastDate.getUTCDate()
	);
	const currentDateUTC = Date.UTC(
		currentDate.getUTCFullYear(),
		currentDate.getUTCMonth(),
		currentDate.getUTCDate()
	);

	// Calculate the difference in milliseconds and convert to days
	const diff: number = (currentDateUTC - pastDateUTC) / (1000 * 60 * 60 * 24);
	const diffInDays = diff - 1 < 0 ? 0 : diff - 1;

	return Math.floor(diffInDays); // Use Math.floor to return full days
}

export default daysFromNow;