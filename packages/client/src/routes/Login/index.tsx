import { useLazyQuery } from "@apollo/client";
import { Card, CardContent, CircularProgress, Icon } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useMount } from "react-use";
import {
    FacebookLoginButton,
    GithubLoginButton,
    GoogleLoginButton
} from "../../components/SocialLoginButton/components";
import { ME } from "../../graphql/mutations";
import { setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { useStyles } from "./style";

export const Login: FC = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [getUser, { loading, data }] = useLazyQuery<any>(ME, {
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
        const mode = new URL(window.location.href).searchParams.get("mode");

        if (mode) {
            getUser();
        }
    });

    if (loading) {
        return (
            <div className={classes.loginPage}>
                <CircularProgress color="primary" size={60} />
            </div>
        );
    }

    if (data?.me) {
        return <Redirect to={`/user/${data.me.id}`} />;
    }

    return (
        <div className={classes.loginPage}>
            <Card className={classes.loginCard} elevation={0} square>
                <CardContent>
                    <Icon color="inherit">hotel</Icon>
                    <div className={classes.loginButtons}>
                        <GoogleLoginButton>
                            Sign in with Google
                        </GoogleLoginButton>
                        <FacebookLoginButton>
                            Sign in with Facebook
                        </FacebookLoginButton>
                        <GithubLoginButton>
                            Sign in with Github
                        </GithubLoginButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
