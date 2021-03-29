import stripe from "stripe";
import { APPLICATION_FEE } from "../constants";

export const client = new stripe(`${process.env.STRIPE_CLIENT_SECRET}`, {
    apiVersion: "2020-08-27"
});

export const Stripe = {
    connect: async (code: string) => {
        const response = await client.oauth.token({
            grant_type: "authorization_code",
            code
        });

        return response;
    },
    disconnect: async (stripeUserId: string) => {
        const response = await client.oauth.deauthorize({
            client_id: `${process.env.STRIPE_CLIENT_ID}`,
            stripe_user_id: stripeUserId
        });

        return response;
    },
    charge: async (
        amount: number,
        source: string,
        stripeAccount: string,
        currency = "aud"
    ) => {
        const response = await client.charges.create(
            {
                amount,
                currency,
                source,
                application_fee_amount: Math.round(amount * APPLICATION_FEE)
            },
            {
                stripe_account: stripeAccount
            }
        );

        if (response.status !== "succeeded") {
            throw new Error("Failed to create charge with Stripe");
        }
    }
};
