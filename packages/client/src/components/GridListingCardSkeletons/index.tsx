import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { ListingCardSkeleton } from "../ListingCardSkeleton";
import { GridListingCardSkeletonProps } from "./types";

export const GridListingCardSkeletons: FC<GridListingCardSkeletonProps> = ({
    amount = 4
}) => (
    <Grid container spacing={4}>
        {Array.from({ length: amount }).map((_, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
                <ListingCardSkeleton />
            </Grid>
        ))}
    </Grid>
);
