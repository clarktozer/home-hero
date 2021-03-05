import { useLazyQuery } from "@apollo/client";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { FC, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useCookie, useMount } from "react-use";
import { Header } from "./components";
import { HeaderSkeleton } from "./components/HeaderSkeleton";
import { ThemeCookie, ThemeType } from "./constants";
import { ME } from "./graphql/mutations";
import { useGoogleApiScript } from "./hooks";
import { Routes } from "./routes";
import { setViewer } from "./state/features";
import { useAppDispatch } from "./state/store";

export const App: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;
    const status = useGoogleApiScript({
        key: process.env.REACT_APP_GOOGLE_API_KEY as string
    });

    const [getUser, { loading }] = useLazyQuery<any>(ME, {
        onCompleted: data => {
            if (data) {
                dispatch(setViewer(data.me));
            }
        }
    });

    useMount(() => {
        if (location.pathname !== "/login") {
            getUser();
        }
    });

    const onToggleTheme = () => {
        updateCookie(isDarkTheme ? ThemeType.Light : ThemeType.Dark);
    };

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: isDarkTheme ? "dark" : "light"
                }
            }),
        [isDarkTheme]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    display: "flex",
                    flex: "auto",
                    flexDirection: "column"
                }}
            >
                {loading ? (
                    <>
                        <HeaderSkeleton />
                        <div
                            style={{
                                flex: "auto",
                                minHeight: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <CircularProgress />
                        </div>
                    </>
                ) : (
                    <>
                        <Header
                            isDarkTheme={isDarkTheme}
                            onToggleTheme={onToggleTheme}
                        />
                        <Routes />
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};
