import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { FC, useMemo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookie } from "react-use";
import { Header } from "./components";
import { ThemeCookie, ThemeType } from "./constants";
import { Routes } from "./routes";
import { Store } from "./state/store";

export const App: FC = () => {
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;

    const onToggleTheme = () => {
        updateCookie(isDarkTheme ? ThemeType.Light : ThemeType.Dark);
    };

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: isDarkTheme ? "dark" : "light",
                },
            }),
        [isDarkTheme]
    );

    return (
        <Provider store={Store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Header
                        isDarkTheme={isDarkTheme}
                        onToggleTheme={onToggleTheme}
                    />
                    <Routes />
                </Router>
            </ThemeProvider>
        </Provider>
    );
};
