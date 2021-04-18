import { useMutation } from "@apollo/client";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Icon,
    Tooltip,
    Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useBoolean } from "react-use";
import {
    ConfirmDialog,
    Notification,
    OverlaySpinner
} from "../../../../components";
import { StripeAuthUrl } from "../../../../constants";
import { DISCONNECT_STRIPE } from "../../../../graphql";
import { getViewer, setViewerWallet } from "../../../../state/features";
import { useAppDispatch } from "../../../../state/store";
import { formatListingPrice, useUtilStyles } from "../../../../utils";
import { DisconnectStripe as DisconnectStripeData } from "../../../../__types/DisconnectStripe";
import { useStyles } from "./style";
import { UserProfileProps } from "./types";

export const UserProfile: FC<UserProfileProps> = ({
    user,
    handleUserRefetch
}) => {
    const viewer = useSelector(getViewer);
    const classes = useStyles();
    const utilClasses = useUtilStyles();
    const dispatch = useAppDispatch();
    const viewerIsUser = viewer && viewer.id === user?.id;
    const { enqueueSnackbar } = useSnackbar();
    const [isOpen, setOpen] = useBoolean(false);

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
        window.location.href = StripeAuthUrl;
    };

    const onConfirmDisconnect = () => {
        setOpen(false);
        disconnectStripe();
    };

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const additionalDetails = user.hasWallet ? (
        <>
            <Typography>
                Income Earned:{" "}
                {user.income ? formatListingPrice(user.income) : `$0`}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={onOpen}
                className={utilClasses.spacingTop1}
            >
                Disconnect Stripe
            </Button>
            <Typography className={utilClasses.spacingTop1}>
                By disconnecting, you won't be able to receive any further
                payments. This will prevent users from booking listings that you
                might have already created.
            </Typography>
        </>
    ) : (
        <>
            <Typography>
                Interested in becoming a host? Register with your Stripe
                account!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={redirectToStripe}
                className={utilClasses.spacingTop1}
            >
                Connect Stripe
            </Button>
        </>
    );

    const additionalDetailsSection = viewerIsUser ? (
        <>
            <Divider variant="middle" />
            <CardContent>{additionalDetails}</CardContent>
        </>
    ) : null;

    return (
        <div className={classes.userProfileCard}>
            <Card>
                {loading && <OverlaySpinner />}
                <CardHeader
                    avatar={
                        <Avatar
                            className={classes.avatar}
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
                    subheader={
                        <>
                            <Typography variant="body2">
                                {user.email}
                            </Typography>
                            {viewerIsUser && user.hasWallet ? (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label="Stripe Registered"
                                    className={utilClasses.spacingTop1}
                                />
                            ) : null}
                        </>
                    }
                />
                {additionalDetailsSection}
            </Card>
            <ConfirmDialog
                title="Are you sure you want to disconnect from Stripe?"
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={onConfirmDisconnect}
            />
        </div>
    );
};
