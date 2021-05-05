import { Listing_listing } from "../../../../__types/Listing";

export interface ListingCreateBookingProps {
    data: Listing_listing;
    handleListingRefetch: () => void;
}
