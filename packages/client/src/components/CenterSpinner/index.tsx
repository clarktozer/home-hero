import { CircularProgress } from "@material-ui/core";
import React, { FC } from "react";
import { useStyles } from "./style";
import { CenterSpinnerProps } from "./types";

export const CenterSpinner: FC<CenterSpinnerProps> = ({ size = 60 }) => {
    const classes = useStyles();

    return (
        <div className={classes.centerSpinner}>
            <CircularProgress color="primary" size={size} />
        </div>
    );
};
