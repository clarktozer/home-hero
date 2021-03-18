import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

export const LoadingOption = () => {
    const classes = useStyles();

    return (
        <div className={classes.spinnerContainer}>
            <CircularProgress size={20} />
        </div>
    );
};
