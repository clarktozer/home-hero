import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useBoolean, useCounter, useInterval, useMount } from "react-use";
import { CenterSpinner } from "../../components";
import { CONFIRM_USER } from "../../graphql";
import { getViewer } from "../../state/features";
import { MatchParams } from "./types";

export const ConfirmUser: FC = () => {
    const viewer = useSelector(getViewer);
    const history = useHistory();
    const { token } = useParams<MatchParams>();
    const [count, { dec }] = useCounter(3, 3, 0);
    const [delay] = useState(1000);
    const [isRunning, toggleIsRunning] = useBoolean(false);
    const { enqueueSnackbar } = useSnackbar();

    const [confirmUser, { data }] = useMutation<any, any>(CONFIRM_USER, {
        onCompleted: data => {
            if (data?.confirmUser) {
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
            <div>
                Thank you for confirming your user. Redirecting you to login in{" "}
                {count}
            </div>
        );
    }

    return <CenterSpinner />;
};
