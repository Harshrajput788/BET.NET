import { config } from "dotenv";
import { emailTempleate } from "../util/templeate.js";
import { transporter } from "../util/email.config.js";

config();

export const sendVerificationCode = async (email: string, verficationCode: string) => {
    try {
        await transporter.sendMail({
            from: `"BET.NET" <${process.env.NODE_EMAIL}>`,
            to: email,
            subject: "Verification Code",
            text: "Verification Email",
            html: emailTempleate.replace("{verification}", verficationCode),
        })
    } catch (error) {
        console.log("Email Error", error);
    }
}

export const sendForgotPasswordEmail = async (email: string,forgotPasswordCode: string) => {
    try {
        await transporter.sendMail({
            from: `"BET.NET" <${process.env.NODE_EMAIL}>`,
            to: email,
            subject: "Forgot Password Code",
            text: "Forgot password code",
            html: `<p>${forgotPasswordCode}</p>`,
        });
    } catch (error) {
        console.log("Email Error", error);
    }
};