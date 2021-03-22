import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { LISTINGS } from "../../graphql";

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home: FC = () => {
    const history = useHistory();

    const { loading, data } = useQuery<any, any>(LISTINGS, {
        variables: {
            filter: "PRICE_HIGH_TO_LOW",
            limit: PAGE_LIMIT,
            page: PAGE_NUMBER
        },
        fetchPolicy: "cache-and-network"
    });

    return <div>Home</div>;
};
