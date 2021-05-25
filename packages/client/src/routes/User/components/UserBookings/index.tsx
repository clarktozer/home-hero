import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { HorizontalList, ListingCardSkeleton } from "../../../../components";
import { ListingCard } from "../../../../components/ListingCard";
import { BOOKINGS_FOR_USER } from "../../../../graphql";
import { useUtilStyles } from "../../../../utils";
import {
    BookingsForUser as BookingsForUserData,
    BookingsForUserVariables,
    BookingsForUser_bookingsForUser_result
} from "../../../../__types/BookingsForUser";
import { MatchParams } from "../../types";

const PAGE_LIMIT = 4;

export const UserBookings: FC = () => {
    const utilClasses = useUtilStyles();
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

    const onRenderLoader = () => (
        <Grid container spacing={4}>
            {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                <Grid key={i} item xs={12} sm={6} md={3}>
                    <div className={utilClasses.marginBottom2}>
                        <Typography gutterBottom variant="body2">
                            <Skeleton animation="wave" width="50%" />
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton animation="wave" width="50%" />
                        </Typography>
                    </div>
                    <ListingCardSkeleton />
                </Grid>
            ))}
        </Grid>
    );

    const onRenderItem = (item: BookingsForUser_bookingsForUser_result) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
            <div className={utilClasses.marginBottom2}>
                <Typography gutterBottom variant="body2">
                    Check in:{" "}
                    <b>{dayjs(item.checkIn).format("MMMM Do YYYY")}</b>
                </Typography>
                <Typography variant="body2">
                    Check out:{" "}
                    <b>{dayjs(item.checkOut).format("MMMM Do YYYY")}</b>
                </Typography>
            </div>
            <ListingCard data={item.listing} />
        </Grid>
    );

    const total = data?.bookingsForUser?.total || 0;
    const result = data?.bookingsForUser?.result || [];

    return (
        <HorizontalList
            title="My Bookings"
            noResultText="You have made no bookings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={result}
            onRenderLoader={onRenderLoader}
            onRenderItem={onRenderItem}
        />
    );
};
