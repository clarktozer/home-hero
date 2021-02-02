import { BaseProvider, DarkTheme, LightTheme } from "baseui";
import { Theme } from "baseui/theme";
import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookie } from "react-use";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { Header } from "./components";
import { ThemeCookie, ThemeType } from "./constants";
import { Routes } from "./routes";
import { Store } from "./state/store";

const engine = new Styletron();

export const App: FC = () => {
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const [theme, setTheme] = useState<Theme>(() =>
        themeCookie === ThemeType.Dark ? DarkTheme : LightTheme
    );

    useEffect(() => {
        setTheme(themeCookie === ThemeType.Dark ? DarkTheme : LightTheme);
    }, [themeCookie, setTheme]);

    const onToggleTheme = () => {
        updateCookie(
            themeCookie === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
        );
    };

    return (
        <Provider store={Store}>
            <StyletronProvider value={engine}>
                <BaseProvider theme={theme}>
                    <Router>
                        <Header onToggleTheme={onToggleTheme} />
                        <Routes />
                    </Router>
                </BaseProvider>
            </StyletronProvider>
        </Provider>
    );
};
