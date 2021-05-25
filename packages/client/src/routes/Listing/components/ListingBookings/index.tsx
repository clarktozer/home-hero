import { useQuery } from "@apollo/client";
import { Avatar, Grid, Link, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { FC, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { HorizontalList } from "../../../../components";
import { BOOKINGS_FOR_LISTING } from "../../../../graphql";
import { useUtilStyles } from "../../../../utils";
import {
    BookingsForListing as BookingsForListingData,
    BookingsForListingVariables,
    BookingsForListing_bookingsForListing_result
} from "../../../../__types/BookingsForListing";
import { MatchParams } from "../../types";
import { useStyles } from "./style";

const PAGE_LIMIT = 6;

export const ListingBookings: FC = () => {
    const utilClasses = useUtilStyles();
    const classes = useStyles();
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

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    const onRenderLoader = () => (
        <Grid container spacing={4}>
            {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                <Grid key={i} item xs={12} sm={4} md={2}>
                    <div className={utilClasses.marginBottom2}>
                        <Typography gutterBottom variant="body2">
                            <Skeleton animation="wave" width="100%" />
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton animation="wave" width="100%" />
                        </Typography>
                    </div>
                    <div className={utilClasses.flexCenter}>
                        <div className={classes.avatar}>
                            <Skeleton
                                animation="wave"
                                variant="circle"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className={classes.name}>
                            <Typography variant="body2">
                                <Skeleton animation="wave" width="100%" />
                            </Typography>
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );

    const onRenderItem = (
        item: BookingsForListing_bookingsForListing_result
    ) => (
        <Grid item key={item.id} xs={12} sm={4} md={2}>
            <div className={utilClasses.marginBottom2}>
                <Typography gutterBottom variant="body2">
                    Check in: <b>{item.checkIn}</b>
                </Typography>
                <Typography variant="body2">
                    Check out: <b>{item.checkOut}</b>
                </Typography>
            </div>
            <Link
                color="secondary"
                component={RouterLink}
                to={`/user/${item.tenant.id}`}
            >
                <div className={utilClasses.flexCenter}>
                    <Avatar
                        className={utilClasses.marginRight1}
                        src={item.tenant.avatar}
                    />
                    {item.tenant.name}
                </div>
            </Link>
        </Grid>
    );

    const total = data?.bookingsForListing?.total || 0;
    const result = data?.bookingsForListing?.result || [];

    return data?.bookingsForListing ? (
        <HorizontalList
            title="Bookings"
            noResultText="There are no bookings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={result}
            onRenderLoader={onRenderLoader}
            onRenderItem={onRenderItem}
        />
    ) : null;
};
