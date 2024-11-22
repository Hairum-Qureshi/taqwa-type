import { sender, transport } from "../mailtrap.config";
import { PERMANENT_BAN_ALERT_TEMPLATE, REPORT_WARNING_TEMPLATE, TEMP_BAN_TEMPLATE } from "../templates";
import dotenv from "dotenv";
dotenv.config();

const SUPPORT_EMAIL:string = process.env.MAILTRAP_DOMAIN!;

export async function sendWarningEmail(user_email:string, reported_pfp:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Warning Email",
          html: REPORT_WARNING_TEMPLATE.replace('{image_src}', reported_pfp).replace('{support_email}', SUPPORT_EMAIL),
          category: "Warning Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap/emails/moderation-related.ts> sendWarningEmail ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendBanEmail(user_email:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Permanent Ban Email",
          html: TEMP_BAN_TEMPLATE.replace('{support_email}', SUPPORT_EMAIL),
          category: "Warning Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap/emails/moderation-related.ts> sendWarningEmail ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendPermanentBanEmail(user_email:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Permanent Ban Email",
          html: PERMANENT_BAN_ALERT_TEMPLATE.replace('{support_email}', SUPPORT_EMAIL),
          category: "Warning Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap/emails/moderation-related.ts> sendWarningEmail ERROR', (error as Error).toString().red.bold);
    }
}