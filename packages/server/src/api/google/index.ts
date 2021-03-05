import { Client } from "@googlemaps/google-maps-services-js";

export const Google = {
    geocode: async (address: string) => {
        const client = new Client();
        const response = await client.geocode({
            params: {
                key: `${process.env.GOOGLE_API_KEY}`,
                address
            }
        });

        return response;
    },
    autocomplete: async (input: string) => {
        const client = new Client();
        const response = await client.placeAutocomplete({
            params: {
                key: `${process.env.GOOGLE_API_KEY}`,
                input
            }
        });

        return response;
    }
};
