import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { CenterSpinner, ErrorBanner, ErrorPage, Page } from "../../components";
import { LISTING } from "../../graphql";
import {
    Listing as ListingData,
    ListingVariables
} from "../../__types/Listing";
import {
    ListingBookings,
    ListingCreateBooking,
    ListingDetails
} from "./components";
import { MatchParams } from "./types";

export const Listing: FC = () => {
    const { id } = useParams<MatchParams>();
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
    });

    const { loading, data, error, refetch } = useQuery<
        ListingData,
        ListingVariables
    >(LISTING, {
        variables: {
            id
        }
    });

    if (loading || !isLoaded) {
        return <CenterSpinner />;
    }

    if (error || loadError) {
        return (
            <>
                <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
                <ErrorPage message="Uh oh, no listing has been found!" />
            </>
        );
    }

    const handleListingRefetch = async () => {
        await refetch();
    };

    const listingDetailsElement = data?.listing && (
        <ListingDetails data={data?.listing} />
    );

    const listingCreateBookingElement = data?.listing ? (
        <ListingCreateBooking
            data={data.listing}
            handleListingRefetch={handleListingRefetch}
        />
    ) : null;

    return (
        <Page>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {listingDetailsElement}
                </Grid>
                <Grid item xs={12} md={4}>
                    {listingCreateBookingElement}
                </Grid>
                <Grid item xs={12}>
                    <ListingBookings />
                </Grid>
            </Grid>
        </Page>
    );
};
