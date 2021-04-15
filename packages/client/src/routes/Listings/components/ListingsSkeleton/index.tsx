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
                <Skeleton
                    animation="wave"
                    variant="rect"
                    width="178px"
                    height="56px"
                />
                <div className={classes.pagination}>
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="180px"
                        height="40px"
                    />
                </div>
            </div>
            <GridListingCardSkeletons amount={8} />
        </>
    );
};
