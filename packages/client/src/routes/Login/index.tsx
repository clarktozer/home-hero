import { useLazyQuery } from "@apollo/client";
import { Card, CardContent, CircularProgress, Icon } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useBoolean, useMount } from "react-use";
import { CenterSpinner } from "../../components";
import { ME } from "../../graphql/queries";
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

    const [getLoggedInUser, { loading, data }] = useLazyQuery<Me>(ME, {
        onCompleted: data => {
            if (data?.me) {
                dispatch(setViewer(data.me));
                enqueueSnackbar("You've successfully logged in!", {
                    variant: "success"
                });
            }
        }
    });

    useMount(() => {
        const success = new URL(window.location.href).searchParams.get(
            "success"
        );

        if (success) {
            getLoggedInUser();
        }
    });

    if (loading) {
        return <CenterSpinner />;
    }

    if (data?.me) {
        const redirectUrl = new URL(window.location.href).searchParams.get(
            "redirect"
        );

        if (redirectUrl) {
            return <Redirect to={redirectUrl} />;
        }

        return <Redirect to={`/user/${data.me.id}`} />;
    }

    const onSocialClick = () => {
        setLoggingIn(true);
    };

    return (
        <div className={classes.loginPage}>
            <Card className={classes.loginCard} elevation={0}>
                {loggingIn && (
                    <div className={classes.overlaySpinner}>
                        <CircularProgress />
                    </div>
                )}
                <CardContent>
                    <Icon color="inherit">hotel</Icon>
                    <SocialLogins onClick={onSocialClick} />
                </CardContent>
            </Card>
        </div>
    );
};
