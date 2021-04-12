import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { GridListingCardSkeletons } from "../../../../components";
import { ListingCard } from "../../../../components/ListingCard";
import { useUtilStyles } from "../../../../utils";
import { FeaturedListingsProps } from "./types";

export const FeaturedListings: FC<FeaturedListingsProps> = ({
    data,
    loading
}) => {
    const utilClasses = useUtilStyles();

    return (
        <>
            <Typography gutterBottom variant="h5">
                Featured Listings
            </Typography>
            {loading ? (
                <GridListingCardSkeletons />
            ) : data.length > 0 ? (
                <Grid container spacing={4}>
                    {data.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={3}>
                            <ListingCard data={item} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography className={utilClasses.textCenter}>
                    No listings available!
                </Typography>
            )}
        </>
    );
};
