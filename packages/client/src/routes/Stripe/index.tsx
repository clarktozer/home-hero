import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useMount } from "react-use";
import { CenterSpinner, Notification } from "../../components";
import { CONNECT_STRIPE } from "../../graphql";
import { getViewer, setViewerWallet } from "../../state/features";
import { useAppDispatch } from "../../state/store";
import {
    ConnectStripe as ConnectStripeData,
    ConnectStripeVariables
} from "../../__types/ConnectStripe";

export const Stripe: FC = () => {
    const history = useHistory();
    const viewer = useSelector(getViewer);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [connectStripe, { data, loading, error }] = useMutation<
        ConnectStripeData,
        ConnectStripeVariables
    >(CONNECT_STRIPE, {
        onCompleted: data => {
            if (data?.connectStripe) {
                dispatch(setViewerWallet(data.connectStripe.hasWallet));
                enqueueSnackbar(
                    <Notification
                        title="You've successfully connected your Stripe Account!"
                        description="You can now begin to create listings in the Host
                        page."
                    />,
                    {
                        variant: "success"
                    }
                );
            }
        }
    });

    useMount(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            connectStripe({
                variables: {
                    code
                }
            });
        } else {
            history.replace("/login");
        }
    });

    if (data?.connectStripe && viewer) {
        return <Redirect to={`/user/${viewer.id}`} />;
    }

    if (loading) {
        return <CenterSpinner label="Connecting your Stripe account..." />;
    }

    if (error && viewer) {
        return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
    }

    return null;
};
