import mailgun from "mailgun-js";
import { v4 } from "uuid";
import { redis } from "../config";
import { CONFIRM_USER_PREFIX } from "../constants";

const mg = mailgun({
    apiKey: `${process.env.MAILGUN_API_KEY}`,
    domain: `${process.env.MAILGUN_DOMAIN}`
});

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
    try {
        const data:
            | mailgun.messages.SendData
            | mailgun.messages.BatchData
            | mailgun.messages.SendTemplateData = {
            from: "noreply@homehero.com",
            to: email,
            subject: "Confirm Email Address",
            template: "confirmation_email",
            "h:X-Mailgun-Variables": JSON.stringify({
                url
            })
        };

        const response = await mg.messages().send(data);

        console.log("Message sent: %s", response.id);
        console.log("Preview: %s", response.message);
    } catch (error) {
        console.log(error);
    }
};
