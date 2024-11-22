import { PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_TEMPLATE, VERIFICATION_TEMPLATE, WELCOME_TEMPLATE } from "../templates";
import { sender, transport } from "../mailtrap.config";

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
        console.log('<mailtrap/emails/account-related.ts> sendVerificationEmail ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendWelcomeEmail(user_email:string, user_id:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Welcome Email",
          html: WELCOME_TEMPLATE.replace("{profile_link}", `http://localhost:5173/user/${user_id}/account`),
          category: "Welcome Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.log('<mailtrap/mailtrap/emails/account-related.ts> sendWelcomeEmail function ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendPasswordResetEmail(user_email:string, token:string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Password Reset Email",
          html: PASSWORD_RESET_TEMPLATE.replace("{reset_link}", `http://localhost:5173/password-reset/${token}`),
          category: "Reset Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {            
        console.log('<mailtrap/mailtrap/emails/account-related.ts> sendPasswordResetEmail function ERROR', (error as Error).toString().red.bold);
    }
}

export async function sendPasswordResetSuccessEmail(user_email: string) {
    try {
        const response = await transport.sendMail({
          from: sender,
          to: [user_email], // recipient is an array of user emails
          subject: "Taqwa Type Password Reset Success Email",
          html: PASSWORD_RESET_SUCCESS_TEMPLATE,
          category: "Reset Success Email"
        });
       
        console.log('Email sent successfully!', response);
    } catch (error) {            
        console.log('<mailtrap/mailtrap/emails/account-related.ts> sendPasswordResetSuccessEmail function ERROR', (error as Error).toString().red.bold);
    }
}