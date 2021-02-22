import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme, isDarkTheme }) => {
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="h6">News</Typography>
                <Button
                    color="inherit"
                    href="http://localhost:4000/auth/google"
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};
