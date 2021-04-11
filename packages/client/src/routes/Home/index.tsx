import { useQuery } from "@apollo/client";
import { Button, Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ListingCard } from "../../components/ListingCard";
import { LISTINGS } from "../../graphql";
import { ListingsFilter, ListingType } from "../../__types/global";
import {
    Listings as ListingsData,
    ListingsVariables
} from "../../__types/Listings";
import {
    FeaturedListings,
    FeaturedListingsSkeleton,
    FeaturedRegions
} from "./components";
import { useStyles } from "./style";

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home: FC = () => {
    const classes = useStyles();

    const { loading, data } = useQuery<ListingsData, ListingsVariables>(
        LISTINGS,
        {
            variables: {
                filter: ListingsFilter.PRICE_HIGH_TO_LOW,
                limit: PAGE_LIMIT,
                page: PAGE_NUMBER
            },
            fetchPolicy: "cache-and-network"
        }
    );

    const renderListingsSection = () => {
        if (loading) {
            return <FeaturedListingsSkeleton />;
        }

        if (data) {
            return <FeaturedListings data={data.listings.result} />;
        }

        return null;
    };

    return (
        <div>
            <Typography gutterBottom variant="h5">
                Find a place you'll love to stay at
            </Typography>
            <FeaturedRegions />
            <div className={classes.middle}>
                <Typography gutterBottom>
                    Your guide for all things rental
                </Typography>
                <Typography gutterBottom>
                    Helping you make the best decisions in renting your last
                    minute locations.
                </Typography>
                <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/listings/Australia"
                    disableElevation
                >
                    Popular listings in Australia
                </Button>
            </div>
            {renderListingsSection()}
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <ListingCard
                        data={{
                            address: "1 Smith Drive",
                            guests: 4,
                            id: "1",
                            image:
                                "https://res.cloudinary.com/tiny-house/image/upload/v1560646430/mock/Cancun/cancun-listing-1_zihihs.jpg",
                            price: 240,
                            title: "Here is a thing",
                            __typename: "Listing",
                            type: ListingType.HOUSE
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ListingCard
                        data={{
                            address: "1 Smith Drive",
                            guests: 4,
                            id: "1",
                            image:
                                "https://res.cloudinary.com/tiny-house/image/upload/v1560646430/mock/Cancun/cancun-listing-1_zihihs.jpg",
                            price: 240,
                            title: "Here is a thing",
                            __typename: "Listing",
                            type: ListingType.APARTMENT
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ListingCard
                        data={{
                            address: "1 Smith Drive",
                            guests: 4,
                            id: "1",
                            image:
                                "https://res.cloudinary.com/tiny-house/image/upload/v1560646430/mock/Cancun/cancun-listing-1_zihihs.jpg",
                            price: 240,
                            title: "Here is a thing",
                            __typename: "Listing",
                            type: ListingType.APARTMENT
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ListingCard
                        data={{
                            address: "1 Smith Drive",
                            guests: 4,
                            id: "1",
                            image:
                                "https://res.cloudinary.com/tiny-house/image/upload/v1560646430/mock/Cancun/cancun-listing-1_zihihs.jpg",
                            price: 240,
                            title: "Here is a thing",
                            __typename: "Listing",
                            type: ListingType.APARTMENT
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
