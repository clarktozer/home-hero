import { useMutation } from "@apollo/client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useMount } from "react-use";
import { CenterSpinner } from "../../components";
import { CONNECT_STRIPE } from "../../graphql";
import { getViewer, setViewer } from "../../state/features";
import { useAppDispatch } from "../../state/store";

export const Stripe: FC = () => {
    const history = useHistory();
    const viewer = useSelector(getViewer);
    const dispatch = useAppDispatch();

    const [connectStripe, { data, loading, error }] = useMutation<any, any>(
        CONNECT_STRIPE,
        {
            onCompleted: data => {
                if (data?.connectStripe) {
                    dispatch(setViewer(data.connectStripe));
                }
            }
        }
    );

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

    if (data?.connectStripe) {
        return <Redirect to={`/user/${data?.connectStripe.id}`} />;
    }

    if (loading) {
        return <CenterSpinner />;
    }

    if (error && viewer) {
        return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
    }

    return <div>Stripe</div>;
};
