import { useMutation } from "@apollo/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Notification } from "../../../../../../components";
import { CREATE_BOOKING } from "../../../../../../graphql";
import {
    CreateBooking as CreateBookingData,
    CreateBookingVariables
} from "../../../../../../__types/CreateBooking";
import { ListingCreateBookingModalProps } from "./types";

export const ListingCreateBookingModal: FC<ListingCreateBookingModalProps> = ({
    listing,
    isOpen,
    onClose,
    checkInDate,
    checkOutDate
}) => {
    const { id } = listing;
    const stripe = useStripe();
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();

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
                <Typography>
                    Enter your payment information to book the listing from the
                    dates between{" "}
                    <b>{dayjs(checkInDate).format("MMMM Do YYYY")}</b> and{" "}
                    <b>{dayjs(checkOutDate).format("MMMM Do YYYY")}</b>,
                    inclusive.
                </Typography>
                <CardElement
                    options={{
                        hidePostalCode: true
                    }}
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
