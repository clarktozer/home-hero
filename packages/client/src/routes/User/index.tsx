import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { CenterSpinner } from "../../components";
import { USER } from "../../graphql";
import { UserProfile } from "./components";
import { useStyles } from "./style";
import { MatchParams, PAGE_LIMIT } from "./types";

export const User: FC = () => {
    const classes = useStyles();
    const { id } = useParams<MatchParams>();
    const [listingsPage] = useState(1);
    const [bookingsPage] = useState(1);

    const { data, loading, refetch } = useQuery<any, any>(USER, {
        variables: {
            id,
            bookingsPage,
            listingsPage,
            limit: PAGE_LIMIT
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) {
        return <CenterSpinner />;
    }

    const handleUserRefetch = async () => {
        await refetch();
    };

    return data?.user ? (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <UserProfile
                        user={data.user}
                        handleUserRefetch={handleUserRefetch}
                    />
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
