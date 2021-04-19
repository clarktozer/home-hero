import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { CenterSpinner, ErrorBanner, ErrorPage, Page } from "../../components";
import { USER } from "../../graphql";
import { useUtilStyles } from "../../utils";
import { User as UserData, UserVariables } from "../../__types/User";
import { UserProfile } from "./components";
import { UserBookings } from "./components/UserBookings";
import { UserFavorites } from "./components/UserFavorites";
import { UserListings } from "./components/UserListings";
import { useStyles } from "./style";
import { MatchParams } from "./types";

export const User: FC = () => {
    const classes = useStyles();
    const utilClasses = useUtilStyles();
    const { id } = useParams<MatchParams>();

    const { data, loading, refetch, error } = useQuery<UserData, UserVariables>(
        USER,
        {
            variables: {
                id
            },
            fetchPolicy: "cache-and-network"
        }
    );

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
                <div className={utilClasses.spacingBottom4}>
                    <UserProfile
                        user={data.user}
                        handleUserRefetch={handleUserRefetch}
                    />
                </div>
                <div className={utilClasses.spacingBottom4}>
                    <UserListings />
                </div>
                <div className={utilClasses.spacingBottom4}>
                    <UserBookings />
                </div>
                <div className={utilClasses.spacingBottom4}>
                    <UserFavorites />
                </div>
            </Page>
        </>
    ) : null;
};
