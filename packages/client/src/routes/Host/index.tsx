import { gql, useQuery } from "@apollo/client";
import { Link } from "@material-ui/core";
import React, { FC } from "react";

export const ME = gql`
    query {
        me {
            id
            income
            email
        }
    }
`;

export const Host: FC = () => {
    const { loading, data, error } = useQuery<any>(ME);

    if (error) {
        console.log(error);
    }

    const renderStuff = () => {
        if (loading) {
            return <div>Loading</div>;
        }

        if (data) {
            return <div>{JSON.stringify(data)}</div>;
        }

        return null;
    };

    return (
        <div>
            {renderStuff()}
            <Link
                href={`${process.env.REACT_APP_API_ENDPOINT}/auth/google?redirect=%2Fhost`}
            >
                Login
            </Link>
        </div>
    );
};
