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
    Tooltip
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { LOG_OUT } from "../../graphql/mutations";
import { clearViewer, getViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { Logout } from "../../__types/Logout";
import { PlacesAutocomplete } from "../PlacesAutocomplete";
import { useStyles } from "./style";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme, isDarkTheme }) => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const history = useHistory();
    const viewer = useSelector(getViewer);
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl
    ] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = "primary-menu";
    const mobileMenuId = "primary-menu-mobile";

    const [logOut] = useMutation<Logout>(LOG_OUT, {
        onCompleted: () => {
            dispatch(clearViewer());
            enqueueSnackbar("You've successfully logged out!", {
                variant: "success"
            });
        },
        onError: () => {
            enqueueSnackbar(
                "Sorry! We weren't able to log you out. Please try again later!",
                {
                    variant: "error"
                }
            );
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

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const avatar = viewer && (
        <ButtonBase focusRipple onClick={handleProfileMenuOpen}>
            <Avatar alt={viewer.name} src={viewer.avatar} />
        </ButtonBase>
    );

    const desktopProfile = avatar || (
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
    );

    const mobileProfile = avatar || (
        <IconButton color="inherit" component={RouterLink} to="/login">
            <Icon>login</Icon>
        </IconButton>
    );

    const themeButton = (
        <IconButton color="inherit" onClick={onToggleTheme}>
            {isDarkTheme ? (
                <Icon>brightness_high</Icon>
            ) : (
                <Icon>brightness_4</Icon>
            )}
        </IconButton>
    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleGoToProfile}>
                <Icon className={classes.menuIcon}>person</Icon>Profile
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
                <Icon className={classes.menuIcon}>exit_to_app</Icon>Logout
            </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>{themeButton}</MenuItem>
            <MenuItem>
                <IconButton color="inherit" component={RouterLink} to="/host">
                    <Icon>home</Icon>
                </IconButton>
            </MenuItem>
            <MenuItem
                className={classes.mobileAvatar}
                onClick={viewer ? handleProfileMenuOpen : undefined}
            >
                {mobileProfile}
            </MenuItem>
        </Menu>
    );

    return (
        <AppBar position="sticky" color="inherit" variant="outlined">
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
                <PlacesAutocomplete />
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <Tooltip title="Toggle light/dark theme">
                        {themeButton}
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
                    {desktopProfile}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                        className={classes.more}
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <Icon>more_horiz</Icon>
                    </IconButton>
                </div>
            </Toolbar>
            {renderMobileMenu}
            {renderMenu}
        </AppBar>
    );
};
