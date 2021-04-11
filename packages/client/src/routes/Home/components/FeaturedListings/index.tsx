import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { ListingCard } from "../../../../components/ListingCard";
import { ListingType } from "../../../../__types/global";
import { FeaturedListingsProps } from "./types";

export const FeaturedListings: FC<FeaturedListingsProps> = ({ data }) => {
    return (
        <div>
            <Typography gutterBottom variant="h5">
                Featured Listings
            </Typography>
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
