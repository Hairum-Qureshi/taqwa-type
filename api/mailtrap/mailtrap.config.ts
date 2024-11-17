import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// ! NOTE: because you signed up with a temporary email address, you'll need to check your temporary email inbox for the emails being sent and not your Gmail

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN!;

export const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN
  })
);

export const sender = {
  address: process.env.MAILTRAP_DOMAIN!,
  name: "Taqwa Type",
};