import { useMutation } from "@apollo/client";
import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useBoolean, useCounter, useInterval, useMount } from "react-use";
import { CenterSpinner } from "../../components";
import { CONFIRM_USER } from "../../graphql";
import { getViewer, setConfirmed } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import { useUtilStyles } from "../../utils";
import {
    ConfirmUser as ConfirmUserData,
    ConfirmUserVariables
} from "../../__types/ConfirmUser";
import { MatchParams } from "./types";

export const ConfirmUser: FC = () => {
    const dispatch = useAppDispatch();
    const utilStyles = useUtilStyles();
    const viewer = useSelector(getViewer);
    const history = useHistory();
    const { token } = useParams<MatchParams>();
    const [count, { dec }] = useCounter(3, 3, 0);
    const [delay] = useState(1000);
    const [isRunning, toggleIsRunning] = useBoolean(false);
    const { enqueueSnackbar } = useSnackbar();

    const [confirmUser, { data, error, loading }] = useMutation<
        ConfirmUserData,
        ConfirmUserVariables
    >(CONFIRM_USER, {
        onCompleted: data => {
            if (data?.confirmUser) {
                dispatch(setConfirmed(true));
                toggleIsRunning();
            } else {
                history.push("/");
            }
        },
        onError: () => {
            enqueueSnackbar(
                "Sorry! We weren't able to confirm your user. Please try again later.",
                {
                    variant: "error"
                }
            );
        }
    });

    useInterval(
        () => {
            if (count === 0) {
                toggleIsRunning();
                history.push(viewer ? "/" : "/login");
            } else {
                dec();
            }
        },
        isRunning ? delay : null
    );

    useMount(() => {
        confirmUser({
            variables: {
                token
            }
        });
    });

    if (data?.confirmUser) {
        return (
            <div className={utilStyles.centerPage}>
                <Typography>
                    Thank you for confirming your user. Redirecting you to login
                    in {count}
                </Typography>
            </div>
        );
    }

    return !loading && error ? (
        <div className={utilStyles.centerPage}>
            <Card className={utilStyles.textCenter} elevation={0}>
                <CardContent>
                    <Icon color="inherit">error</Icon>
                    <Typography className={utilStyles.marginTop2}>
                        Unable to confirm your user
                    </Typography>
                </CardContent>
            </Card>
        </div>
    ) : (
        <CenterSpinner />
    );
};
