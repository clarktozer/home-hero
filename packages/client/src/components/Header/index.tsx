import { useMutation } from "@apollo/client";
import {
    AppBar,
    Avatar,
    Button,
    ButtonBase,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LOG_OUT } from "../../graphql/mutations";
import { getViewer, setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { useStyles } from "./header.style";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme, isDarkTheme }) => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const location = useLocation();
    const viewer = useSelector(getViewer);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const [logOut] = useMutation<any>(LOG_OUT, {
        onCompleted: data => {
            dispatch(setViewer(null));
        }
    });

    const handleLogOut = () => {
        handleMenuClose();
        logOut();
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div>
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
                    <div>
                        {viewer && (
                            <ButtonBase
                                focusRipple
                                onClick={handleProfileMenuOpen}
                            >
                                <Avatar alt="Remy Sharp" src={viewer.avatar} />
                            </ButtonBase>
                        )}
                        <Button
                            color="inherit"
                            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/google`}
                        >
                            Login Google
                        </Button>
                        <Button
                            color="inherit"
                            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/github`}
                        >
                            Login Github
                        </Button>
                        <Button
                            color="inherit"
                            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/facebook`}
                        >
                            Login Facebook
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};
