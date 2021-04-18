import { Listings_listings_result } from "../../__types/Listings";

export interface ListingsSectionProps {
    title: string;
    loading: boolean;
    data: Listings_listings_result[];
    onPageChange: (page: number) => void;
    page: number;
    limit: number;
    total: number;
    noResultText: string;
}
