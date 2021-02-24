import {
    AppBar,
    Icon,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../Header/header.style";

export const HeaderSkeleton = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    className={classes.menuButton}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Typography className={classes.title} variant="h6">
                    Home
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
