import { useApolloClient } from "@apollo/client";
import { Link } from "@material-ui/core";
import React, { FC } from "react";

export const Login: FC = () => {
    const client = useApolloClient();

    return <Link href="http://localhost:4000/auth/google">Login</Link>;
};
