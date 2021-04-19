import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingsSection } from "../../../../components";
import { LISTINGS_FOR_USER } from "../../../../graphql";
import {
    ListingsForUser as ListingsForUserData,
    ListingsForUserVariables
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

    const total = data?.listingsForUser?.total || 0;
    const result = data?.listingsForUser?.result || [];

    return (
        <ListingsSection
            title="Listings"
            noResultText="There are no listings!"
            page={page}
            onPageChange={onPageChange}
            loading={loading}
            total={total}
            limit={PAGE_LIMIT}
            data={result}
        />
    );
};
