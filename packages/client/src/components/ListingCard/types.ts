import { ListingType } from "../../__types/global";

export interface ListingCardProps {
    data: {
        id: string;
        title: string;
        image: string;
        address: string;
        price: number;
        guests: number;
        type: ListingType;
    };
}
