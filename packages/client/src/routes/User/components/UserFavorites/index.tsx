import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
    GridListingCardSkeletons,
    HorizontalList
} from "../../../../components";
import { ListingCard } from "../../../../components/ListingCard";
import { FAVOURITE_LISTINGS_FOR_USER } from "../../../../graphql";
import {
    FavouriteListingsForUser as FavouriteListingsForUserData,
    FavouriteListingsForUserVariables,
    FavouriteListingsForUser_favouriteListingsForUser_result
} from "../../../../__types/FavouriteListingsForUser";
import { MatchParams } from "../../types";

const PAGE_LIMIT = 4;

export const UserFavorites: FC = () => {
    const { id } = useParams<MatchParams>();
    const [page, setPage] = useState(1);

    const { loading, data } = useQuery<
        FavouriteListingsForUserData,
        FavouriteListingsForUserVariables
    >(FAVOURITE_LISTINGS_FOR_USER, {
        variables: {
            page,
            userId: id,
            limit: PAGE_LIMIT
        }
    });

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    const onRenderLoader = () => <GridListingCardSkeletons />;

    const onRenderItem = (
        item: FavouriteListingsForUser_favouriteListingsForUser_result
    ) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
            <ListingCard data={item} />
        </Grid>
    );

    const total = data?.favouriteListingsForUser?.total || 0;
    const result = data?.favouriteListingsForUser?.result || [];

    return (
        <HorizontalList
            title="My Favourites"
            noResultText="You have no favourite listings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={result}
            onRenderLoader={onRenderLoader}
            onRenderItem={onRenderItem}
        />
    );
};
