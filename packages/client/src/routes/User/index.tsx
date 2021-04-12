import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { CenterSpinner } from "../../components";
import {
    BOOKINGS_FOR_USER,
    FAVOURITE_LISTINGS_FOR_USER,
    LISTINGS_FOR_USER,
    USER
} from "../../graphql";
import {
    BookingsForUser as BookingsForUserData,
    BookingsForUserVariables
} from "../../__types/BookingsForUser";
import {
    FavouriteListingsForUser as FavouriteListingsForUserData,
    FavouriteListingsForUserVariables
} from "../../__types/FavouriteListingsForUser";
import {
    ListingsForUser as ListingsForUserData,
    ListingsForUserVariables
} from "../../__types/ListingsForUser";
import { User as UserData, UserVariables } from "../../__types/User";
import { UserProfile } from "./components";
import { useStyles } from "./style";
import { MatchParams } from "./types";

const PAGE_LIMIT = 4;

export const User: FC = () => {
    const classes = useStyles();
    const { id } = useParams<MatchParams>();
    const [listingsPage] = useState(1);
    const [bookingsPage] = useState(1);

    const { data, loading, refetch } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id
        },
        fetchPolicy: "cache-and-network"
    });

    const { loading: bookingsLoading, data: bookingsData } = useQuery<
        BookingsForUserData,
        BookingsForUserVariables
    >(BOOKINGS_FOR_USER, {
        variables: {
            bookingsPage,
            userId: id,
            limit: PAGE_LIMIT
        }
    });

    const { loading: listingsLoading, data: listingsData } = useQuery<
        ListingsForUserData,
        ListingsForUserVariables
    >(LISTINGS_FOR_USER, {
        variables: {
            listingsPage,
            userId: id,
            limit: PAGE_LIMIT
        }
    });

    const { loading: favListingsLoading, data: favListingsData } = useQuery<
        FavouriteListingsForUserData,
        FavouriteListingsForUserVariables
    >(FAVOURITE_LISTINGS_FOR_USER, {
        variables: {
            listingsPage,
            userId: id,
            limit: PAGE_LIMIT
        }
    });

    if (loading) {
        return <CenterSpinner />;
    }

    const handleUserRefetch = async () => {
        await refetch();
    };

    return data?.user ? (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <UserProfile
                        user={data.user}
                        handleUserRefetch={handleUserRefetch}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    ) : null;
};
