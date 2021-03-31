import { useQuery } from "@apollo/client";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { USER } from "../../graphql";
import { getViewer } from "../../state/features";
import { useStyles } from "./style";
import { MatchParams, PAGE_LIMIT } from "./types";

export const User: FC = () => {
    const viewer = useSelector(getViewer);
    const classes = useStyles();
    const { id } = useParams<MatchParams>();
    const [listingsPage] = useState(1);
    const [bookingsPage] = useState(1);

    const { data, loading } = useQuery<any, any>(USER, {
        variables: {
            id,
            bookingsPage,
            listingsPage,
            limit: PAGE_LIMIT
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) {
        return (
            <div>
                <CircularProgress color="primary" size={60} />
            </div>
        );
    }

    const user = data ? data.user : null;
    const viewerIsUser = viewer?.id === id;

    return user ? (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" square>
                        <CardHeader
                            avatar={
                                <Avatar
                                    className={classes.large}
                                    alt={user.name}
                                    src={user.avatar}
                                />
                            }
                            title={
                                <Typography gutterBottom variant="h5">
                                    {user.name}
                                </Typography>
                            }
                            subheader={user.email}
                        />
                        <CardContent>
                            {viewerIsUser && user.confirmed ? (
                                <Chip label="Confirmed" color="primary" />
                            ) : null}
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                gutterBottom
                            >
                                Temporibus sint fugiat ipsum iusto dignissimos
                                qui fuga molestiae. Maiores et cum numquam
                                possimus occaecati est adipisci. Commodi
                                quibusdam et molestiae rerum beatae nulla
                                minima. Ducimus dolorum temporibus tenetur.
                                Minima nemo fugit hic totam hic quos ut
                                praesentium. Eos ea sit cum necessitatibus.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                gutterBottom
                            >
                                Temporibus sint fugiat ipsum iusto dignissimos
                                qui fuga molestiae. Maiores et cum numquam
                                possimus occaecati est adipisci. Commodi
                                quibusdam et molestiae rerum beatae nulla
                                minima. Ducimus dolorum temporibus tenetur.
                                Minima nemo fugit hic totam hic quos ut
                                praesentium. Eos ea sit cum necessitatibus.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                    >
                        Temporibus sint fugiat ipsum iusto dignissimos qui fuga
                        molestiae. Maiores et cum numquam possimus occaecati est
                        adipisci. Commodi quibusdam et molestiae rerum beatae
                        nulla minima. Ducimus dolorum temporibus tenetur. Minima
                        nemo fugit hic totam hic quos ut praesentium. Eos ea sit
                        cum necessitatibus.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    ) : null;
};
