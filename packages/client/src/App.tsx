import { useQuery } from "@apollo/client";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { FC, useMemo } from "react";
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
    const { loading } = useQuery<any>(ME, {
        onCompleted: data => {
            if (data) {
                dispatch(setViewer(data.me));
            }
        }
    });
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;

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
            </div>
        </ThemeProvider>
    );
};
