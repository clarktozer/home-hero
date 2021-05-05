import dayjs from "dayjs";
import { Listing_listing } from "../../../../../../__types/Listing";

export interface ListingCreateBookingModalProps {
    listing: Listing_listing;
    isOpen: boolean;
    onClose: () => void;
    checkInDate: dayjs.Dayjs;
    checkOutDate: dayjs.Dayjs;
    onBookingCompleted: () => void;
}
