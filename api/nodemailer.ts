import nodemailer from "nodemailer";
import colors from "colors";
import { UserReport } from "./interfaces";
import daysFromNow from "./utils/date-tool";

colors.enable();

function callEmailAuth(): nodemailer.Transporter {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.APP_PASS
		}
	});

	return transporter;
}

async function sendReport(
	report: UserReport,
	backend_base_url: string,
	reporter: string,
	frontend_base_url: string
) {
	// TODO - NEED TO ADD 'REPORTER' VALUE!
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
                        <h3>Salam Hairum, <br /> ${reporter} reported the following profile for having an inappropriate profile picture:</h3>
                        <a href = ${frontend_base_url}/user/${
				report._id
			}/account></a>
                        <p>Here is some information about the reported user:</p>
                        <ul>
                            <li>User ID: ${report._id}</li>
                            <li>User email: ${report.email}</li>
                            <li>User full name: ${report.full_name}</li>
                            <li>Account age: <b>${daysFromNow(
															report.createdAt
														)} days old</b> - (${report.createdAt})</li>
                            <li>Link to profile picture: ${report.pfp}</li>
							<li>Link to user profile: ${frontend_base_url}/user/${report._id}/account</li>
                            <li>Has this user been banned before? ${
															report.hasBeenBannedBefore ? "Yes" : "No"
														}</li>
                        </ul>
            
                        <p>Here is the image of the profile picture:</p>
                        <img src="${report.pfp}" alt="reported pfp" width="100" height="100" style="object-fit: cover; border-radius: 10px;" />

                        <p>If you would like to ban this user, press the following button:</p>
                        <button style="background-color: #C11010; padding: 10px 20px; border: none; border-radius: 5px;"><a href = "${backend_base_url}/api/user/${
				report._id
			}/ban" style = "text-decoration: none; color: white;">BAN USER</a></button>
                        <br />                   
  ${
		!report.hasBeenWarnedBefore
			? `<p>If you would like the system to send a warning email to the user, press the following button:</p>
            <button style="background-color: #4CAF50; padding: 10px 20px; border: none; border-radius: 5px;">
           <a href="${backend_base_url}/api/user/${report._id}/email" 
              style="text-decoration: none; color: white;">
              SEND EMAIL
           </a>
         </button>`
			: `<p>This user has already been warned. You may want to consider banning them.</p>`
	}
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
                    <>
                        We are notifying you that your account has been banned due to an inappropriate profile picture. As Taqwa Type provides a platform for reading the words of Allah (God) while improving your typing skills, it is essential that all users uphold the principles of Islam. Images representing inappropriate content, immodesty, or any other offensive content is prohibited. 
						<br />
						Here is the image of the profile picture:
                        <img src="${pfp}" alt="reported pfp" width="130" height="130" style="object-fit: cover; border-radius: 10px;" />
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
			replyTo: "no-reply@taqwa-type.com",
			subject: "[Taqwa Type] Ban Status Update",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                        <h3>Salam, this is an email to let you know your ban has been lifted. Please note that if you are reported again, you will get permanently banned. </h3>

						<p><i>Replies to this email will not be read. Please contact Taqwa Type if you have any questions/concerns.</i></p>
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
			replyTo: "no-reply@taqwa-type.com",
			subject: "[Taqwa Type] - Warning",
			html: `<!DOCTYPE html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body>
                        <h3>Salam, ${full_name}, <br /> This is an email to let you know you are receiving a warning for having an inappropriate profile picture. You have two (2) days to change your profile picture. Failure to update it within these two days will result in your account being banned. Taqwa Type is not the kind of site to host inappropriate profile pictures as it's a site dedicated to remembering the words of Allah (God) and practicing your typing. Please understand that inappropriate content of any kind is prohibited. <br /> Thank you. </h3>

						<p><i>Replies to this email will not be read. Please contact Taqwa Type if you have any questions/concerns.</i></p>
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}

async function followUpEmail(
	email: string,
	full_name: string,
	pfp: string,
	hasBeenBannedBefore: boolean
) {
	// TODO - will need to figure out a way to distinguish "temporary bans" and "permanent bans"
	// TODO - will need to add 'ban user' button
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
                        <h3>Salam Hairum, this is a follow-up email for you to see if ${full_name} has changed their profile picture after you approved to send a warning email to them 2 days ago. If the user's profile picture is still inappropriate, see below for your options. If the user has changed their profile picture to something more appropriate and halal, feel free to discard this email.</h3>
                        <h4>${
													hasBeenBannedBefore
														? "Because this user has been banned before, they will need to be permanently banned."
														: "Because this user has not been banned before, their account will need to be banned."
												}</h4>
                        <p>This is their profile picture we have from the database:</p>
                        <img src = "${pfp}" alt = "user pfp" />
                    </body>
                    </html>`
		});
	} catch (error) {
		"<nodemailer.ts> sendEmail function error".yellow,
			(error as Error).toString().red.bold;
	}
}
export {
	sendReport,
	sendBanEmail,
	sendAccountStatusEmail,
	sendWarningEmail,
	followUpEmail
};
