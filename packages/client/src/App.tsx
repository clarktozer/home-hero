import { BaseProvider, DarkTheme } from "baseui";
import React, { FC } from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import "./App.css";
import { Content } from "./content";
import { Navigation } from "./nav";

const engine = new Styletron();

export const App: FC = () => {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={DarkTheme}>
                <Navigation />
                <Content />
            </BaseProvider>
        </StyletronProvider>
    );
};
