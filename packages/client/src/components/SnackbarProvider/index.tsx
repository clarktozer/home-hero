import { SnackbarOrigin, SnackbarProvider as Provider } from "notistack";
import React, { FC } from "react";
import { useStyles } from "./style";

const anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "top"
};

export const SnackbarProvider: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Provider
            anchorOrigin={anchorOrigin}
            autoHideDuration={3000}
            classes={{
                containerRoot: classes.root
            }}
        >
            {children}
        </Provider>
    );
};
