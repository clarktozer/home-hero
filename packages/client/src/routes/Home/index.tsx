import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { LISTINGS } from "../../graphql";
import { ListingsFilter } from "../../__types/global";
import {
    Listings as ListingsData,
    ListingsVariables
} from "../../__types/Listings";

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home: FC = () => {
    useQuery<ListingsData, ListingsVariables>(LISTINGS, {
        variables: {
            filter: ListingsFilter.PRICE_HIGH_TO_LOW,
            limit: PAGE_LIMIT,
            page: PAGE_NUMBER
        },
        fetchPolicy: "cache-and-network"
    });

    return <div>Home</div>;
};
