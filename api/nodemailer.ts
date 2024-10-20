import nodemailer from "nodemailer";
import colors from "colors";
import { UserReport } from "./types";

colors.enable();

function callEmailAuth(): nodemailer.Transporter {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL, // the email address
			pass: process.env.APP_PASS // the email address's app password
		}
	});

	return transporter;
}

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
	const diffInDays = (currentDateUTC - pastDateUTC) / (1000 * 60 * 60 * 24) - 1;

	return Math.floor(diffInDays); // Use Math.floor to return full days
}

async function sendReport(
	report: UserReport,
	backend_base_url: string,
	reporter: string
) {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: "[Taqwa Type] User Report: Inappropriate Profile Picture",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                        <div style = "width: 100%; height: 10px; backgroundColor: 'blue';"></div>
                        <h3>Salam Hairum, <br /> ${reporter} reported the following profile for having an inappropriate profile picture:</h3>
                        <a href = ${backend_base_url}/user/${
				report._id
			}/account></a>
                        <p>Here is some information about the reported user:</p>
                        <ul>
                            <li>User ID: ${report._id}</li>
                            <li>User email: ${report.email}</li>
                            <li>User full name: ${report.full_name}</li>
                            <li>Account Age: <b>${daysFromNow(
															report.createdAt
														)} days old</b> - (${report.createdAt})</li>
                            <li>Pfp link: ${report.pfp}</li>
                        </ul>
            
                        <p>Here is the image of the profile picture:</p>
                        <img src = "${
													report.pfp
												}" alt = "reported profile picture">
                        <p>If you would like to ban this user, press the following button:</p>
                        <button><a href = "${backend_base_url}/${
				report._id
			}/ban" style = "text-decoration: none; color: black;">BAN USER</a></button>
                        <br />
                        <p>If you would like the system to send a warning email to the user, press the following button:</p>
                        <button><a href = "https://www.example.com" style = "text-decoration: none; color: black;">SEND EMAIL</a></button>
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

export default sendReport;
