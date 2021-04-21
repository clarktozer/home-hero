import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { FC } from "react";
import { useStyles } from "../../style";

export const UserProfileSkeleton: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.userProfileCard}>
            <Card>
                <CardHeader
                    avatar={
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={80}
                            height={80}
                        />
                    }
                    title={
                        <Typography gutterBottom variant="h5">
                            <Skeleton animation="wave" width="50%" />
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2">
                            <Skeleton animation="wave" width="60%" />
                        </Typography>
                    }
                />
                <Divider variant="middle" />
                <CardContent>
                    <Typography>
                        <Skeleton animation="wave" width="100%" />
                        <Skeleton animation="wave" width="80%" />
                        <Skeleton animation="wave" width="90%" />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};
