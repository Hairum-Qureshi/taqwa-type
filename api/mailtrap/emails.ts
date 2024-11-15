import { VERIFICATION_TEMPLATE } from "./email-templates/verification";
import { WELCOME_TEMPLATE } from "./templates";
import { sender, transport } from "./mailtrap.config";

export async function sendVerificationEmail(user_email:string, verification_code:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Verification Email",
          html: VERIFICATION_TEMPLATE.replace('{VERIFICATION_CODE}', verification_code),
          category: "Email Verification"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap.config.ts> ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendWelcomeEmail(user_email:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Welcome Email",
          html: WELCOME_TEMPLATE,
          category: "Welcome Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap.config.ts> ERROR', (error as Error).toString().red.bold);
    }
}