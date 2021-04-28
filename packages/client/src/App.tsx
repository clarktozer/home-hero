import { useQuery } from "@apollo/client";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { FC } from "react";
import { useCookie } from "react-use";
import {
    CenterSpinner,
    ErrorBanner,
    Header,
    HeaderSkeleton,
    ScrollToTop
} from "./components";
import { DarkTheme, LightTheme, ThemeCookie, ThemeType } from "./constants";
import { ME } from "./graphql/queries";
import { Routes } from "./routes";
import { setViewer } from "./state/features";
import { useAppDispatch } from "./state/store";
import { useStyles } from "./style";
import { Me } from "./__types/Me";

export const App: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [themeCookie, updateCookie] = useCookie(ThemeCookie);
    const isDarkTheme = themeCookie === ThemeType.Dark;
    const theme = isDarkTheme ? DarkTheme : LightTheme;

    const { loading, error } = useQuery<Me>(ME, {
        onCompleted: data => {
            if (data?.me) {
                dispatch(setViewer(data.me));
            }
        }
    });

    const onToggleTheme = () => {
        updateCookie(isDarkTheme ? ThemeType.Light : ThemeType.Dark);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {loading && !error ? (
                <div className={classes.appContainer}>
                    <HeaderSkeleton />
                    <CenterSpinner />
                </div>
            ) : (
                <div className={classes.appContainer}>
                    {error && (
                        <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
                    )}
                    <Header
                        isDarkTheme={isDarkTheme}
                        onToggleTheme={onToggleTheme}
                    />
                    <ScrollToTop>
                        <Routes />
                    </ScrollToTop>
                </div>
            )}
        </ThemeProvider>
    );
};
