import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { MatchParams } from "./types";

export const ConfirmUser: FC = () => {
    const { token } = useParams<MatchParams>();

    return <div>{token}</div>;
};
