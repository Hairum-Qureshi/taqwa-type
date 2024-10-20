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
	reporter: string,
	frontend_base_url: string
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
                        <a href = ${frontend_base_url}/user/${
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
                            <li>Has this user been banned before? ${
															report.hasBeenBannedBefore ? "Yes" : "No"
														}</li>
                        </ul>
            
                        <p>Here is the image of the profile picture:</p>
                        <img src = "${
													report.pfp
												}" alt = "reported profile picture">
                        <p>If you would like to ban this user, press the following button:</p>
                        <button><a href = "${backend_base_url}/api/user/${
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

async function sendBanEmail(full_name: string, email: string, pfp: string) {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: "[Taqwa Type] Important Notice",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                    <h3>Salam, ${full_name}</h3>
                    <p>
                        We are notifying you that your account has been banned due to an inappropriate profile picture. As Taqwa Type provides a platform for reading the words of Allah (God) while improving your typing skills, it is essential that all users uphold the principles of Islam. Images representing inappropriate content, immodesty, or any other offensive content is prohibited. 
                        <br />
                        The image in question we have on record that has been reported is the following: <br />
                        <img src = "${pfp}" alt = "reported pfp" /> 
                    </p>
                    </p>
                        Please understand that adherence to these guidelines is expected when using our site. Attempts to evade this ban will result in consequences. <br />
                        <b>Your ban will end in one (1) month, however, repeated offenses will result in your account being <u>permanently</u> banned.</b> <br/>

                        Thank you for your understanding.
                    </p>    
                    <p>If you find this to be a mistake or you would like to discuss this decision further, please respond to this email.</p>
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

async function sendAccountStatusEmail(email: string) {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: "[Taqwa Type] Ban Status Update",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                        <h3>Salam, this is an email to let you know your ban has been lifted. Please note that if you are reported again, you will get permanently banned. </h3>
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

async function sendWarningEmail(email: string, full_name: string) {
	try {
		const transporter = callEmailAuth();
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: "[Taqwa Type] - Warning",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                        <h3>Salam, ${full_name}, <br /> This is an email to let you know you are receiving a warning for having an inappropriate profile picture. You have two (2) days to change your profile picture. Failure to update it within these two days will result in your account being banned. Taqwa Type is not the kind of site to host inappropriate profile picture that's dedicated to remembering the words of Allah (God). Please understand that inappropriate content of any kind is prohibited. <br /> Thank you. </h3>
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

export { sendReport, sendBanEmail, sendAccountStatusEmail, sendWarningEmail };
