import DayJSUtils from "@date-io/dayjs";
import {
    Button,
    Card,
    CardContent,
    Divider,
    Icon,
    InputAdornment,
    Typography
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getViewer } from "../../../../state/features";
import { formatListingPrice } from "../../../../utils";
import { ListingCreateBookingModal } from "./components";
import { ListingCreateBookingProps } from "./types";

export const ListingCreateBooking: FC<ListingCreateBookingProps> = ({
    data
}) => {
    const { price, host } = data;
    const viewer = useSelector(getViewer);
    const [isOpen, setOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState<dayjs.Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<dayjs.Dayjs | null>(null);

    const onCheckInDateChange = (date: MaterialUiPickersDate) => {
        setCheckInDate(date);
    };

    const onCheckOutDateChange = (date: MaterialUiPickersDate) => {
        setCheckOutDate(date);
    };

    const onRequestToBook = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const viewerIsHost = viewer?.id === host.id;
    const checkInInputDisabled = !viewer?.id || viewerIsHost || !host.hasWallet;
    const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
    const buttonDisabled =
        checkOutInputDisabled || !checkInDate || !checkOutDate;
    let buttonMessage = "You won't be charged yet";

    if (!viewer?.id) {
        buttonMessage = "You have to be signed in to book a listing!";
    } else if (viewerIsHost) {
        buttonMessage = "You can't book your own listing!";
    } else if (!host.hasWallet) {
        buttonMessage =
            "The host has disconnected from Stripe and thus won't be able to receive payments!";
    }

    return (
        <MuiPickersUtilsProvider utils={DayJSUtils} libInstance={dayjs}>
            <div>
                <Card elevation={0}>
                    <CardContent>
                        <Typography>
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Typography>
                        <Divider />
                        <div>
                            <Typography>Check In</Typography>
                            <DatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                value={checkInDate}
                                inputVariant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon>event</Icon>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={onCheckInDateChange}
                                autoOk
                            />
                        </div>
                        <div>
                            <Typography>Check Out</Typography>
                            <DatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                value={checkOutDate}
                                inputVariant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon>event</Icon>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={onCheckOutDateChange}
                                autoOk
                            />
                        </div>
                        <Divider />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={onRequestToBook}
                        >
                            Request to book!
                        </Button>
                        <Typography>{buttonMessage}</Typography>
                    </CardContent>
                </Card>
                {checkInDate && checkOutDate ? (
                    <ListingCreateBookingModal
                        isOpen={isOpen}
                        onClose={onClose}
                        listing={data}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                    />
                ) : null}
            </div>
        </MuiPickersUtilsProvider>
    );
};
