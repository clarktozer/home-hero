import { useMutation } from "@apollo/client";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Icon,
    Tooltip,
    Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../../../../components";
import { DISCONNECT_STRIPE } from "../../../../graphql";
import { getViewer, setViewerWallet } from "../../../../state/features";
import { useAppDispatch } from "../../../../state/store";
import { DisconnectStripe as DisconnectStripeData } from "../../../../__types/DisconnectStripe";
import { useStyles } from "./style";
import { UserProfileProps } from "./types";

const stripeAuthUrl = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`;

export const UserProfile: FC<UserProfileProps> = ({
    user,
    handleUserRefetch
}) => {
    const viewer = useSelector(getViewer);
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const viewerIsUser = viewer && viewer.id === user?.id;
    const { enqueueSnackbar } = useSnackbar();

    const [disconnectStripe, { loading }] = useMutation<DisconnectStripeData>(
        DISCONNECT_STRIPE,
        {
            onCompleted: data => {
                if (data?.disconnectStripe) {
                    dispatch(setViewerWallet(data?.disconnectStripe.hasWallet));
                    enqueueSnackbar(
                        <Notification
                            title="You've successfully disconnected from Stripe!"
                            description="You'll have to reconnect with Stripe to continue
                        to create listings."
                        />,
                        {
                            variant: "success"
                        }
                    );
                    handleUserRefetch();
                }
            },
            onError: () => {
                enqueueSnackbar(
                    "Sorry! We weren't able to disconnect you from Stripe. Please try again later!",
                    {
                        variant: "error"
                    }
                );
            }
        }
    );

    const redirectToStripe = () => {
        window.location.href = stripeAuthUrl;
    };

    return (
        <div>
            <Card variant="outlined" square>
                <CardHeader
                    avatar={
                        <Avatar
                            className={classes.large}
                            alt={user.name}
                            src={user.avatar}
                        />
                    }
                    title={
                        <Typography gutterBottom variant="h5">
                            {user.name}
                            {viewerIsUser && user.confirmed ? (
                                <Tooltip title="Activated, you can now book listings!">
                                    <Icon
                                        className={classes.confirmed}
                                        color="inherit"
                                        fontSize="small"
                                    >
                                        check_circle
                                    </Icon>
                                </Tooltip>
                            ) : null}
                        </Typography>
                    }
                    subheader={user.email}
                />
                <CardContent></CardContent>
            </Card>
        </div>
    );
};
