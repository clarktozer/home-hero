import { Icon, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useUtilStyles } from "../../utils";

export const NotFound: FC = () => {
    const utilStyles = useUtilStyles();

    return (
        <div className={utilStyles.centerPage}>
            <div className={utilStyles.textCenter}>
                <Icon color="inherit">error</Icon>
                <Typography className={utilStyles.spacingTop2}>
                    Uh oh, page not found!
                </Typography>
            </div>
        </div>
    );
};
