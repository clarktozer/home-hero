import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ErrorBanner, ErrorPage, Page } from "../../components";
import { USER } from "../../graphql";
import { getViewer } from "../../state/features";
import { useUtilStyles } from "../../utils";
import { User as UserData, UserVariables } from "../../__types/User";
import { UserProfile } from "./components";
import { UserBookings } from "./components/UserBookings";
import { UserFavorites } from "./components/UserFavorites";
import { UserListings } from "./components/UserListings";
import { UserProfileSkeleton } from "./components/UserProfile/components";
import { MatchParams } from "./types";

export const User: FC = () => {
    const utilClasses = useUtilStyles();
    const viewer = useSelector(getViewer);
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

    const user = data ? data.user : null;
    const viewerIsUser = viewer?.id === id;

    return (
        <>
            {stripeErrorBanner}
            <Page>
                <div className={utilClasses.spacingBottom4}>
                    {loading ? (
                        <UserProfileSkeleton />
                    ) : user ? (
                        <UserProfile
                            user={user}
                            handleUserRefetch={handleUserRefetch}
                        />
                    ) : null}
                </div>
                {user && (
                    <>
                        <div className={utilClasses.spacingBottom4}>
                            <UserListings />
                        </div>
                        {viewerIsUser && (
                            <>
                                <div className={utilClasses.spacingBottom4}>
                                    <UserBookings />
                                </div>
                                <div className={utilClasses.spacingBottom4}>
                                    <UserFavorites />
                                </div>
                            </>
                        )}
                    </>
                )}
            </Page>
        </>
    );
};
