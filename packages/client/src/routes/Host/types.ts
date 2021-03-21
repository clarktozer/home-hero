export interface FormProps {
    type: string;
    numOfGuests?: number;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    price?: number;
    recaptcha?: string;
    image?: string;
}
