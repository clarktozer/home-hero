import { Alert, AlertTitle } from "@material-ui/lab";
import React, { FC } from "react";
import { ErrorBannerProps } from "./types";

export const ErrorBanner: FC<ErrorBannerProps> = ({
    message = "Uh oh! Something went wrong :(",
    description = "Look like something went wrong. Please check your connection and/or try again later."
}) => (
    <Alert severity="error">
        <AlertTitle>{message}</AlertTitle>
        {description}
    </Alert>
);
