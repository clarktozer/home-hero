import { gql, useApolloClient } from "@apollo/client";
import React, { FC } from "react";

export const LOG_IN = gql`
    mutation LogIn($input: LogInInput) {
        logIn(input: $input) {
            id
            token
            avatar
            hasWallet
            didRequest
        }
    }
`;

export const Home: FC = () => {
    const client = useApolloClient();

    return <div></div>;
};
