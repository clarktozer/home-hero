import { useMutation } from "@apollo/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    useTheme
} from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Notification } from "../../../../../../components";
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
    checkOutDate
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

    const [createBooking, { loading }] = useMutation<
        CreateBookingData,
        CreateBookingVariables
    >(CREATE_BOOKING, {
        onCompleted: () => {
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
            <DialogTitle>Book</DialogTitle>
            <DialogContent>
                <div className={utilStyles.spacingBottom2}>
                    <Typography>
                        Enter your payment information to book the listing from
                        the dates (inclusive) between:{" "}
                    </Typography>
                    <div>
                        <Typography>Check In</Typography>
                        <b>{dayjs(checkInDate).format("MMMM Do YYYY")}</b>
                    </div>
                    <div>
                        <Typography>Check Out</Typography>
                        <b>{dayjs(checkOutDate).format("MMMM Do YYYY")}</b>
                    </div>
                </div>
                <Divider className={utilStyles.spacingBottom2} />
                <div className={utilStyles.spacingBottom2}>
                    <Typography>
                        {formatListingPrice(price, false)} * {daysBooked} days ={" "}
                        <b>{formatListingPrice(listingPrice, false)}</b>
                    </Typography>
                    <Typography className="listing-booking-modal__charge-summary-total">
                        Total = <b>{formatListingPrice(listingPrice, false)}</b>
                    </Typography>
                </div>
                <Divider className={utilStyles.spacingBottom2} />
                <CardElement
                    options={{
                        hidePostalCode: true,
                        iconStyle: "solid",
                        style: {
                            base: {
                                iconColor: theme.palette.primary.main,
                                color: "#fff",
                                fontWeight: "500",
                                fontFamily:
                                    "Roboto, Open Sans, Segoe UI, sans-serif",
                                fontSize: "16px",
                                fontSmoothing: "antialiased",
                                ":-webkit-autofill": {
                                    color: "#fce883"
                                },
                                "::placeholder": {
                                    color: "#87bbfd"
                                }
                            },
                            invalid: {
                                iconColor: theme.palette.error.main,
                                color: theme.palette.error.main
                            }
                        }
                    }}
                    className={classes.card}
                />
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
