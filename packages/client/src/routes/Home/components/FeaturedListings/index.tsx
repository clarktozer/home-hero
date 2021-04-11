import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { FeaturedListingsProps } from "./types";

export const FeaturedListings: FC<FeaturedListingsProps> = ({ data }) => {
    return (
        <div>
            <Typography gutterBottom variant="h5">
                Premium Listings
            </Typography>
        </div>
    );
};
