import classnames from "classnames";
import React, { FC } from "react";
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

    return (
        <Provider store={Store}>
            <div
                className={classnames({
                    "bp3-dark": isDarkTheme,
                })}
            >
                <Router>
                    <Header
                        isDarkTheme={isDarkTheme}
                        onToggleTheme={onToggleTheme}
                    />
                    <Routes />
                </Router>
            </div>
        </Provider>
    );
};
