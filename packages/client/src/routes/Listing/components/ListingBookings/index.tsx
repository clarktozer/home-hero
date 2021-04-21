import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { BOOKINGS_FOR_LISTING } from "../../../../graphql";
import {
    BookingsForListing as BookingsForListingData,
    BookingsForListingVariables
} from "../../../../__types/BookingsForListing";
import { MatchParams } from "../../types";

const PAGE_LIMIT = 3;

export const ListingBookings: FC = () => {
    const { id } = useParams<MatchParams>();
    const [page, setPage] = useState(1);

    const { loading, data } = useQuery<
        BookingsForListingData,
        BookingsForListingVariables
    >(BOOKINGS_FOR_LISTING, {
        variables: {
            listingId: id,
            page,
            limit: PAGE_LIMIT
        }
    });

    return <div>ListingBookings</div>;
};
