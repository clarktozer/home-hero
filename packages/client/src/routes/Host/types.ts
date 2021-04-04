import { ListingType } from "../../__types/global";

export interface HostListingFormValues {
    type?: ListingType;
    guests?: number;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    price?: number;
    recaptcha: string;
    image: string;
    maxStay: number;
    minStay: number;
}
