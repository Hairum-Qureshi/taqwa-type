import { VERIFICATION_EMAIL } from "./email-templates/verification";
import { sender, transport } from "./mailtrap.config";

export default async function sendVerificationEmail(user_email:string, verification_code:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Verification Email",
          html: VERIFICATION_EMAIL.replace('{VERIFICATION_CODE}', verification_code),
          category: "Email Verification"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap.config.ts> ERROR', (error as Error).toString().red.bold);
    }
}