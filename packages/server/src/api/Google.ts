import {
    AddressComponent,
    AddressType,
    Client,
    GeocodingAddressComponentType,
    PlaceAutocompleteType
} from "@googlemaps/google-maps-services-js";

const parseAddress = (addressComponents: AddressComponent[]) => {
    let country = null;
    let admin = null;
    let city = null;

    for (const component of addressComponents) {
        if (component.types.includes(AddressType.country)) {
            country = component.long_name;
        }

        if (component.types.includes(AddressType.administrative_area_level_1)) {
            admin = component.long_name;
        }

        if (
            component.types.includes(AddressType.locality) ||
            component.types.includes(GeocodingAddressComponentType.postal_town)
        ) {
            city = component.long_name;
        }
    }

    return { country, admin, city };
};

export const Google = {
    geocode: async (address: string) => {
        const client = new Client();
        const response = await client.geocode({
            params: {
                key: `${process.env.GOOGLE_API_KEY}`,
                address
            }
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error("Failed to geocode address");
        }

        return parseAddress(response.data.results[0].address_components);
    },
    autocomplete: async (input: string, types?: PlaceAutocompleteType) => {
        const client = new Client();
        const response = await client.placeAutocomplete({
            params: {
                key: `${process.env.GOOGLE_API_KEY}`,
                input,
                types
            }
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error("Failed to autocomplete address");
        }

        return response.data;
    }
};
