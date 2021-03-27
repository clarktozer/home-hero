import { useLazyQuery } from "@apollo/client";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useCookie, useMount } from "react-use";
import { Header } from "./components";
import { HeaderSkeleton } from "./components/HeaderSkeleton";
import { DarkTheme, LightTheme, ThemeCookie, ThemeType } from "./constants";
import { ME } from "./graphql/queries";
import { Routes } from "./routes";
import { setViewer } from "./state/features";
import { useAppDispatch } from "./state/store";
import { useStyles } from "./style";

export const App: FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;

    const [getLoggedInUser, { loading }] = useLazyQuery<any>(ME, {
        onCompleted: data => {
            if (data?.me) {
                dispatch(setViewer(data.me));
            }
        },
        onError: () => {
            enqueueSnackbar(
                "We weren't able to verify if you were logged in. Please try again later!",
                {
                    variant: "error"
                }
            );
        }
    });

    useMount(() => {
        if (location.pathname !== "/login") {
            getLoggedInUser();
        }
    });

    const onToggleTheme = () => {
        updateCookie(isDarkTheme ? ThemeType.Light : ThemeType.Dark);
    };

    const appElement = loading ? (
        <>
            <HeaderSkeleton />
            <div className={classes.loadingContainer}>
                <CircularProgress />
            </div>
        </>
    ) : (
        <>
            <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
            <Routes />
        </>
    );

    return (
        <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
            <CssBaseline />
            <div className={classes.appContainer}>{appElement}</div>
        </ThemeProvider>
    );
};
