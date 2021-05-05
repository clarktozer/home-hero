import { useMutation } from "@apollo/client";
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Icon,
    Tooltip,
    Typography,
    useTheme
} from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import classnames from "classnames";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Notification, OverlaySpinner } from "../../../../../../components";
import { CREATE_BOOKING } from "../../../../../../graphql";
import { formatListingPrice, useUtilStyles } from "../../../../../../utils";
import {
    CreateBooking as CreateBookingData,
    CreateBookingVariables
} from "../../../../../../__types/CreateBooking";
import { useStyles } from "./style";
import { ListingCreateBookingModalProps } from "./types";

export const ListingCreateBookingModal: FC<ListingCreateBookingModalProps> = ({
    listing,
    isOpen,
    onClose,
    checkInDate,
    checkOutDate,
    onBookingCompleted
}) => {
    const { id, price } = listing;
    const classes = useStyles();
    const utilStyles = useUtilStyles();
    const theme = useTheme();
    const stripe = useStripe();
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();
    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;
    const fee = listingPrice * 0.05;
    const total = listingPrice + fee;

    const [createBooking, { loading }] = useMutation<
        CreateBookingData,
        CreateBookingVariables
    >(CREATE_BOOKING, {
        onCompleted: () => {
            onBookingCompleted();
            enqueueSnackbar(
                <Notification
                    title="You've successfully booked the listing!"
                    description="Booking history can always be found in your User page."
                />,
                {
                    variant: "success"
                }
            );
        },
        onError: () => {
            enqueueSnackbar(
                "Sorry! We weren't able to successfully book the listing. Please try again later!",
                {
                    variant: "success"
                }
            );
        }
    });

    const handleCreateBooking = async () => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            let { token, error } = await stripe.createToken(cardElement);

            if (token) {
                createBooking({
                    variables: {
                        input: {
                            id,
                            source: token.id,
                            checkIn: checkInDate.format("YYYY-MM-DD"),
                            checkOut: checkOutDate.format("YYYY-MM-DD")
                        }
                    }
                });
            } else {
                enqueueSnackbar(
                    error?.message ||
                        "Sorry! We weren't able to successfully book the listing. Please try again later!",
                    {
                        variant: "error"
                    }
                );
            }
        }
    };

    return (
        <Dialog onClose={onClose} open={isOpen}>
            {loading && <OverlaySpinner />}
            <DialogTitle>Book</DialogTitle>
            <DialogContent>
                <div className={utilStyles.spacingBottom2}>
                    <Typography>
                        Enter your payment information to book the listing from
                        the dates (inclusive) between{" "}
                        <b>{dayjs(checkInDate).format("MMMM Do YYYY")}</b> to{" "}
                        <b>{dayjs(checkOutDate).format("MMMM Do YYYY")}</b>,
                        inclusive.
                    </Typography>
                </div>
                <Divider className={utilStyles.spacingBottom2} />
                <div
                    className={classnames(
                        utilStyles.spacingBottom2,
                        utilStyles.textCenter
                    )}
                >
                    <Typography gutterBottom>
                        {formatListingPrice(price, false)} * {daysBooked} days ={" "}
                        {formatListingPrice(listingPrice, false)}
                    </Typography>
                    <Typography gutterBottom>
                        Our fee
                        <Tooltip title="5% of the total amount">
                            <Icon className={classes.help}>help</Icon>
                        </Tooltip>{" "}
                        = {formatListingPrice(fee, false)}
                    </Typography>
                    <Chip
                        color="secondary"
                        label={`Total = ${formatListingPrice(total, false)}`}
                        className={classes.total}
                    ></Chip>
                </div>
                <Divider className={utilStyles.spacingBottom2} />
                <div
                    style={{
                        background: theme.palette.background.default
                    }}
                >
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            iconStyle: "solid",
                            style: {
                                base: {
                                    iconColor: theme.palette.text.primary,
                                    color: theme.palette.text.primary,
                                    fontWeight: "500",
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: "16px",
                                    fontSmoothing: "antialiased",
                                    ":-webkit-autofill": {
                                        color: theme.palette.text.primary
                                    },
                                    "::placeholder": {
                                        color: theme.palette.text.primary
                                    }
                                },
                                invalid: {
                                    iconColor: theme.palette.error.main,
                                    color: theme.palette.error.main
                                }
                            }
                        }}
                        className={classes.stripe}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    autoFocus
                    onClick={handleCreateBooking}
                >
                    Book
                </Button>
            </DialogActions>
        </Dialog>
    );
};
