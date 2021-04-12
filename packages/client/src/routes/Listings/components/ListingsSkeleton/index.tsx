import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { FC } from "react";
import { GridListingCardSkeletons } from "../../../../components";
import { useStyles } from "./style";

export const ListingsSkeleton: FC = () => {
    const classes = useStyles();

    return (
        <>
            <Typography gutterBottom variant="h5">
                <Skeleton animation="wave" width="30%" />
            </Typography>
            <div className={classes.bar}>
                <Skeleton animation="wave" width="10%" height="88px" />
                <div className={classes.pagination}>
                    <Skeleton animation="wave" width="30%" height="40px" />
                </div>
            </div>
            <GridListingCardSkeletons amount={8} />
        </>
    );
};
