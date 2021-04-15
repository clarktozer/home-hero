import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../components";
import { BOOKINGS_FOR_LISTING, LISTING } from "../../graphql";
import {
    BookingsForListing as BookingsForListingData,
    BookingsForListingVariables
} from "../../__types/BookingsForListing";
import {
    Listing as ListingData,
    ListingVariables
} from "../../__types/Listing";
import { MatchParams } from "./types";

const PAGE_LIMIT = 3;

export const Listing: FC = () => {
    const { id } = useParams<MatchParams>();
    const [bookingsPage, setBookingsPage] = useState(1);

    const { loading, data } = useQuery<ListingData, ListingVariables>(LISTING, {
        variables: {
            id
        }
    });

    const { loading: bookingLoading, data: bookingData } = useQuery<
        BookingsForListingData,
        BookingsForListingVariables
    >(BOOKINGS_FOR_LISTING, {
        variables: {
            listingId: id,
            bookingsPage,
            limit: PAGE_LIMIT
        }
    });

    return <Page>Listing</Page>;
};
