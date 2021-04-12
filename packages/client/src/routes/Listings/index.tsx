import { useQuery } from "@apollo/client";
import { Grid, Link, MenuItem, Select, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import classnames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ErrorBanner, ErrorPage } from "../../components";
import { ListingCard } from "../../components/ListingCard";
import { LISTINGS } from "../../graphql";
import { useUtilStyles } from "../../utils";
import { ListingsFilter } from "../../__types/global";
import {
    Listings as ListingsData,
    ListingsVariables
} from "../../__types/Listings";
import { ListingsSkeleton } from "./components";
import { useStyles } from "./style";
import { MatchParams } from "./types";

const PAGE_LIMIT = 8;

export const Listings: FC = () => {
    const { location } = useParams<MatchParams>();
    const locationRef = useRef(location);
    const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const utilClasses = useUtilStyles();
    const classes = useStyles();

    const { loading, data, error } = useQuery<ListingsData, ListingsVariables>(
        LISTINGS,
        {
            skip: locationRef.current !== location && page !== 1,
            variables: {
                location,
                filter,
                limit: PAGE_LIMIT,
                page
            }
        }
    );

    useEffect(() => {
        setPage(1);
        locationRef.current = location;
    }, [location]);

    if (loading) {
        return <ListingsSkeleton />;
    }

    if (error) {
        return (
            <>
                <ErrorBanner
                    description={`
            We either couldn't find anything matching your search or have encountered an error.
            If you're searching for a unique location, try searching again with more common keywords.
          `}
                />
                <ErrorPage message="Uh oh, no listings have been found!" />
            </>
        );
    }

    const onPaginationChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setPage(page);
    };

    const onFilterChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        setFilter(event.target.value as ListingsFilter);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const listingsSectionElement = data?.listings.result.length ? (
        <div>
            <div className={classnames(utilClasses.flexCenter, classes.bar)}>
                <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={filter}
                    onChange={onFilterChange}
                    variant="outlined"
                >
                    <MenuItem value={ListingsFilter.PRICE_LOW_TO_HIGH}>
                        Price: Low to High
                    </MenuItem>
                    <MenuItem value={ListingsFilter.PRICE_HIGH_TO_LOW}>
                        Price: High to Low
                    </MenuItem>
                    <MenuItem value={ListingsFilter.TITLE_ASC}>
                        Title: Ascending
                    </MenuItem>
                    <MenuItem value={ListingsFilter.TITLE_DESC}>
                        Title: Descending
                    </MenuItem>
                </Select>
                <Pagination
                    className={classes.pagination}
                    size="large"
                    count={data.listings.total}
                    page={page}
                    color="primary"
                    onChange={onPaginationChange}
                />
            </div>
            <Grid container spacing={4}>
                {data.listings.result.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={3}>
                        <ListingCard data={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    ) : (
        <div>
            <Typography>
                It appears that no listings have yet been created for "
                {data?.listings.region}"
            </Typography>
            <Typography>
                Be the first person to create a{" "}
                <Link color="secondary" component={RouterLink} to="/host">
                    listing in this area
                </Link>
                !
            </Typography>
        </div>
    );

    const listingsRegionElement = data?.listings.region && (
        <Typography gutterBottom variant="h5">
            Results for "{data.listings.region}"
        </Typography>
    );

    return (
        <div>
            {listingsRegionElement}
            {listingsSectionElement}
        </div>
    );
};
