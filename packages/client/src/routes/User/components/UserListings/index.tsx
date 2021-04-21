import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
    GridListingCardSkeletons,
    HorizontalList
} from "../../../../components";
import { ListingCard } from "../../../../components/ListingCard";
import { LISTINGS_FOR_USER } from "../../../../graphql";
import {
    ListingsForUser as ListingsForUserData,
    ListingsForUserVariables,
    ListingsForUser_listingsForUser_result
} from "../../../../__types/ListingsForUser";
import { MatchParams } from "../../types";

const PAGE_LIMIT = 4;

export const UserListings: FC = () => {
    const { id } = useParams<MatchParams>();
    const [page, setPage] = useState(1);

    const { loading, data } = useQuery<
        ListingsForUserData,
        ListingsForUserVariables
    >(LISTINGS_FOR_USER, {
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

    const onRenderItem = (item: ListingsForUser_listingsForUser_result) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
            <ListingCard data={item} />
        </Grid>
    );

    const total = data?.listingsForUser?.total || 0;
    const result = data?.listingsForUser?.result || [];

    return (
        <HorizontalList
            title="Listings"
            noResultText="There are no listings!"
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
