import { sender, transport } from "../mailtrap.config";
import { REPORT_WARNING_TEMPLATE } from "../templates";
import dotenv from "dotenv";
dotenv.config();

export async function sendWarningEmail(user_email:string, reported_pfp:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Warning Email",
          html: REPORT_WARNING_TEMPLATE.replace('{image_src}', reported_pfp).replace('{support_email}', process.env.MAILTRAP_DOMAIN!),
          category: "Warning Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap/emails/moderation-related.ts> sendWarningEmail ERROR', (error as Error).toString().red.bold);
    }
}