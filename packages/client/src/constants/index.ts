import { createMuiTheme } from "@material-ui/core";

export enum ThemeType {
    Dark = "dark",
    Light = "light"
}

export const ThemeCookie = "hhtheme";

export const DarkTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export const LightTheme = createMuiTheme({
    palette: {
        type: "light"
    }
});
