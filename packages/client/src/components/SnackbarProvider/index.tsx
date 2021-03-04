import { SnackbarOrigin, SnackbarProvider as Provider } from "notistack";
import React, { FC } from "react";
import { useStyles } from "./style";

const anchorOrigin: SnackbarOrigin = {
    horizontal: "left",
    vertical: "top"
};

export const SnackbarProvider: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Provider
            className={classes.root}
            anchorOrigin={anchorOrigin}
            autoHideDuration={2000}
        >
            {children}
        </Provider>
    );
};
