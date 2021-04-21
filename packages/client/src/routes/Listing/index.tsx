import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { ErrorBanner, ErrorPage, Page } from "../../components";
import { LISTING } from "../../graphql";
import {
    Listing as ListingData,
    ListingVariables
} from "../../__types/Listing";
import { ListingCreateBooking, ListingDetails } from "./components";
import { MatchParams } from "./types";

export const Listing: FC = () => {
    const { id } = useParams<MatchParams>();

    const { loading, data, error, refetch } = useQuery<
        ListingData,
        ListingVariables
    >(LISTING, {
        variables: {
            id
        }
    });

    if (error) {
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
        <ListingCreateBooking data={data.listing} />
    ) : null;

    return (
        <Page>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                    {listingDetailsElement}
                </Grid>
                <Grid item xs={12} lg={5}>
                    {listingCreateBookingElement}
                </Grid>
            </Grid>
        </Page>
    );
};
