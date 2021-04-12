import { useQuery } from "@apollo/client";
import { Button, Typography } from "@material-ui/core";
import classnames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { LISTINGS } from "../../graphql";
import { useUtilStyles } from "../../utils";
import { ListingsFilter } from "../../__types/global";
import {
    Listings as ListingsData,
    ListingsVariables
} from "../../__types/Listings";
import { FeaturedListings, FeaturedRegions } from "./components";
import { useStyles } from "./style";

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home: FC = () => {
    const utilClasses = useUtilStyles();
    const classes = useStyles();

    const { loading, data } = useQuery<ListingsData, ListingsVariables>(
        LISTINGS,
        {
            variables: {
                filter: ListingsFilter.PRICE_HIGH_TO_LOW,
                limit: PAGE_LIMIT,
                page: PAGE_NUMBER
            },
            fetchPolicy: "cache-and-network"
        }
    );

    return (
        <div>
            <Typography gutterBottom variant="h5">
                Find a place you'll love to stay at
            </Typography>
            <FeaturedRegions />
            <div
                className={classnames(utilClasses.textCenter, classes.section)}
            >
                <Typography gutterBottom>
                    Your guide for all things rental
                </Typography>
                <Typography gutterBottom>
                    Helping you make the best decisions in renting your last
                    minute locations.
                </Typography>
                <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/listings/Australia"
                    disableElevation
                >
                    Popular listings in Australia
                </Button>
            </div>
            <div className={classes.section}>
                {data ? (
                    <FeaturedListings
                        loading={loading}
                        data={data.listings.result}
                    />
                ) : null}
            </div>
        </div>
    );
};
