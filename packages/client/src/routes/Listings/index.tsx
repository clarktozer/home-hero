import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { MatchParams } from "./types";

export const Listings: FC = () => {
    const { location } = useParams<MatchParams>();

    return <div>Listings {location}</div>;
};
