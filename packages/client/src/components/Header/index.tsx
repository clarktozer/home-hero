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
import { getViewer, setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
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
    const isMenuOpen = Boolean(anchorEl);

    const [logOut] = useMutation<any>(LOG_OUT, {
        onCompleted: () => {
            dispatch(setViewer(null));
        }
    });

    const handleLogOut = () => {
        enqueueSnackbar("You've successfully logged out!", {
            variant: "success"
        });
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
                        <ButtonBase focusRipple onClick={handleProfileMenuOpen}>
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
            {renderMenu}
        </AppBar>
    );
};
