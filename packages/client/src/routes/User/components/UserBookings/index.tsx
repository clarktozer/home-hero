import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingsSection } from "../../../../components";
import { BOOKINGS_FOR_USER } from "../../../../graphql";
import {
    BookingsForUser as BookingsForUserData,
    BookingsForUserVariables
} from "../../../../__types/BookingsForUser";
import { MatchParams } from "../../types";

const PAGE_LIMIT = 4;

export const UserBookings: FC = () => {
    const { id } = useParams<MatchParams>();
    const [page, setPage] = useState(1);

    const { loading, data } = useQuery<
        BookingsForUserData,
        BookingsForUserVariables
    >(BOOKINGS_FOR_USER, {
        variables: {
            page,
            userId: id,
            limit: PAGE_LIMIT
        }
    });

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    const total = data?.bookingsForUser?.total || 0;
    const result =
        data?.bookingsForUser?.result.map(booking => booking.listing) || [];

    return (
        <ListingsSection
            title="My Bookings"
            noResultText="You have made no bookings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={[]}
        />
    );
};
