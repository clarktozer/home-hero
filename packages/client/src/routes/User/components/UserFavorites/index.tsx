import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingsSection } from "../../../../components";
import { FAVOURITE_LISTINGS_FOR_USER } from "../../../../graphql";
import {
    FavouriteListingsForUser as FavouriteListingsForUserData,
    FavouriteListingsForUserVariables
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

    const total = data?.favouriteListingsForUser?.total || 0;
    const result = data?.favouriteListingsForUser?.result || [];

    return (
        <ListingsSection
            title="My Favourites"
            noResultText="You have no favourite listings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={result}
        />
    );
};
