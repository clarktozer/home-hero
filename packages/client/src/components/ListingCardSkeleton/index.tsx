import { Card, CardActions, CardHeader, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { FC } from "react";
import { useStyles } from "./style";

export const ListingCardSkeleton: FC = () => {
    const classes = useStyles();

    return (
        <Card>
            <Skeleton
                animation="wave"
                variant="rect"
                className={classes.media}
            />
            <CardHeader
                title={
                    <Typography variant="h5">
                        <Skeleton animation="wave" width="90%" />
                    </Typography>
                }
                subheader={
                    <>
                        <Typography variant="body1">
                            <Skeleton animation="wave" width="20%" />
                        </Typography>
                        <Typography variant="body2">
                            <Skeleton animation="wave" width="60%" />
                        </Typography>
                    </>
                }
            />
            <CardActions className={classes.actions}>
                <Skeleton
                    animation="wave"
                    variant="circle"
                    width={24}
                    height={24}
                />
                <Skeleton
                    className={classes.guests}
                    animation="wave"
                    variant="circle"
                    width={24}
                    height={24}
                />
            </CardActions>
        </Card>
    );
};
