import { useMutation } from "@apollo/client";
import {
    AppBar,
    Avatar,
    Button,
    ButtonBase,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { LOG_OUT } from "../../graphql/mutations";
import { getViewer, setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { useStyles } from "./style";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme, isDarkTheme }) => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const history = useHistory();
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

    const handleGoToProfile = () => {
        if (viewer) {
            history.push(`/user/${viewer.id}`);
        }
        handleMenuClose();
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
            <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        component={RouterLink}
                        to="/"
                    >
                        <Icon>hotel</Icon>
                    </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Icon>search</Icon>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="Toggle light/dark theme">
                            <IconButton color="inherit" onClick={onToggleTheme}>
                                {isDarkTheme ? (
                                    <Icon>brightness_high</Icon>
                                ) : (
                                    <Icon>brightness_4</Icon>
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Host">
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                component={RouterLink}
                                to="/host"
                            >
                                <Icon>home</Icon>
                            </IconButton>
                        </Tooltip>
                        {viewer ? (
                            <ButtonBase
                                focusRipple
                                onClick={handleProfileMenuOpen}
                            >
                                <Avatar alt={viewer.name} src={viewer.avatar} />
                            </ButtonBase>
                        ) : (
                            <Button
                                size="medium"
                                color="primary"
                                variant="contained"
                                component={RouterLink}
                                to="/login"
                                startIcon={<Icon>login</Icon>}
                                disableElevation
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};
