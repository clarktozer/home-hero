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

export const StripeAuthUrl = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`;
