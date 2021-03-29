import nodemailer from "nodemailer";
import { v4 } from "uuid";
import { redis } from "../config";
import { CONFIRM_USER_PREFIX } from "../constants";

export const createConfirmationUrl = async (userId: string) => {
    const token = v4();
    await redis.set(
        `${CONFIRM_USER_PREFIX}${token}`,
        userId,
        "ex",
        60 * 60 * 24
    ); // 1 day expiration

    return `${process.env.CLIENT_URL}/user/confirm/${token}`;
};

export const sendEmail = async (email: string, url: string) => {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<a href="${url}">${url}</a>` // html body
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
