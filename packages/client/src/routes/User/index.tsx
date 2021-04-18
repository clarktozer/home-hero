import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { CenterSpinner, ErrorBanner, ErrorPage, Page } from "../../components";
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

    const { data, loading, refetch, error } = useQuery<UserData, UserVariables>(
        USER,
        {
            variables: {
                id
            },
            fetchPolicy: "cache-and-network"
        }
    );

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

    const stripeError = new URL(window.location.href).searchParams.get(
        "stripe_error"
    );
    const stripeErrorBanner = stripeError ? (
        <ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
    ) : null;

    if (loading) {
        return <CenterSpinner />;
    }

    if (error) {
        return (
            <>
                <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
                <ErrorPage />
            </>
        );
    }

    const handleUserRefetch = async () => {
        await refetch();
    };

    return data?.user ? (
        <>
            {stripeErrorBanner}
            <Page>
                <UserProfile
                    user={data.user}
                    handleUserRefetch={handleUserRefetch}
                />
            </Page>
        </>
    ) : null;
};
