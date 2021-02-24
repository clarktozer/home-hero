import { useQuery } from "@apollo/client";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { FC, useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookie } from "react-use";
import { Header } from "./components";
import { HeaderSkeleton } from "./components/HeaderSkeleton";
import { ThemeCookie, ThemeType } from "./constants";
import { ME } from "./graphql/mutations";
import { Routes } from "./routes";
import { setViewer } from "./state/features";
import { useAppDispatch } from "./state/store";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { loading, data } = useQuery<any>(ME);
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;

    useEffect(() => {
        if (data) {
            dispatch(setViewer(data.me));
        }
    }, [data, dispatch]);

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
            {loading ? (
                <>
                    <HeaderSkeleton />
                    <CircularProgress />
                </>
            ) : (
                <Router>
                    <Header
                        isDarkTheme={isDarkTheme}
                        onToggleTheme={onToggleTheme}
                    />
                    <Routes />
                </Router>
            )}
        </ThemeProvider>
    );
};
