import { useLazyQuery } from "@apollo/client";
import { Card, CardContent, Icon } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { useBoolean, useMount } from "react-use";
import { ErrorBanner, OverlaySpinner, Page } from "../../components";
import { ME } from "../../graphql";
import { setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { Me } from "../../__types/Me";
import { SocialLogins } from "./components";
import { useStyles } from "./style";

export const Login: FC = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [loggingIn, setLoggingIn] = useBoolean(false);
    const [error, setError] = useState<string | null>(null);

    const [getLoggedInUser, { loading, data }] = useLazyQuery<Me>(ME, {
        onCompleted: data => {
            if (data?.me) {
                dispatch(setViewer(data.me));
            }
        }
    });

    useMount(() => {
        const url = new URL(window.location.href);
        const success = url.searchParams.get("success");
        const error = url.searchParams.get("error");
        setError(error);

        if (success) {
            enqueueSnackbar("You've successfully logged in!", {
                variant: "success"
            });
            getLoggedInUser();
        }
    });

    const onSocialClick = () => {
        setLoggingIn(true);
    };

    if (data?.me) {
        const url = new URL(window.location.href);
        const redirectUrl = url.searchParams.get("redirect");

        return <Redirect to={redirectUrl || `/user/${data.me.id}`} />;
    }

    return (
        <>
            {error && (
                <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
            )}
            <Page>
                <div className={classes.loginPage}>
                    <Card className={classes.loginCard} elevation={0}>
                        {loggingIn || loading ? <OverlaySpinner /> : null}
                        <CardContent>
                            <Icon color="inherit">hotel</Icon>
                            <SocialLogins onClick={onSocialClick} />
                        </CardContent>
                    </Card>
                </div>
            </Page>
        </>
    );
};
