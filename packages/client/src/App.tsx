import { BaseProvider, DarkTheme, LightTheme } from "baseui";
import { Theme } from "baseui/theme";
import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { Home } from "./home";
import { Navigation } from "./nav";

const engine = new Styletron();

export const App: FC = () => {
    const [theme, setTheme] = useState<Theme>(DarkTheme);

    const onToggleTheme = () =>
        setTheme(theme === DarkTheme ? LightTheme : DarkTheme);

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
                <Navigation onToggleTheme={onToggleTheme} />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
};
