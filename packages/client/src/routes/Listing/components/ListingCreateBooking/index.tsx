import DayJSUtils from "@date-io/dayjs";
import {
    Button,
    Card,
    CardContent,
    Divider,
    Icon,
    InputAdornment,
    Tooltip,
    Typography,
    useTheme
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import classnames from "classnames";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeType } from "../../../../constants";
import { getViewer } from "../../../../state/features";
import { formatListingPrice, useUtilStyles } from "../../../../utils";
import { ListingCreateBookingModal } from "./components";
import { useStyles } from "./style";
import { ListingCreateBookingProps } from "./types";

export const ListingCreateBooking: FC<ListingCreateBookingProps> = ({
    data,
    handleListingRefetch
}) => {
    const utilStyles = useUtilStyles();
    const classes = useStyles();
    const theme = useTheme();
    const { price, host, maxStay, minStay } = data;
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

    const clearBookingData = () => {
        setOpen(false);
        setCheckInDate(null);
        setCheckOutDate(null);
        handleListingRefetch();
    };

    const viewerIsHost = viewer?.id === host.id;
    const checkInInputDisabled = !viewer?.id || viewerIsHost || !host.hasWallet;
    const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
    const disableBooking =
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

    const shouldDisableDate = (day: MaterialUiPickersDate) => {
        if (day) {
            const dateIsBeforeEndOfDay = day.isBefore(dayjs().endOf("day"));
            const dateIsMoreThanThreeMonthsAhead = day.isAfter(
                dayjs().endOf("day").add(90, "days")
            );
            const dateBooked = false;

            return (
                dateIsBeforeEndOfDay ||
                dateIsMoreThanThreeMonthsAhead ||
                dateBooked
            );
        }

        return false;
    };

    const shouldDisableCheckoutDate = (day: MaterialUiPickersDate) => {
        if (day && checkInDate) {
            const isBeforeCheckinDate = day.isBefore(
                checkInDate.add(minStay, "days")
            );
            const isAfterMaxStay = day.isAfter(
                checkInDate.add(maxStay, "days")
            );

            return isBeforeCheckinDate || isAfterMaxStay;
        }

        return shouldDisableDate(day);
    };

    const onRenderDay = (
        day: MaterialUiPickersDate,
        _selectedDate: MaterialUiPickersDate,
        _dayInCurrentMonth: boolean,
        dayComponent: JSX.Element
    ) => {
        if (day && checkInDate && day.isSame(checkInDate, "day")) {
            return (
                <Tooltip title="Check in date">
                    <div>{day?.format("DD")}</div>
                </Tooltip>
            );
        }

        return dayComponent;
    };

    return (
        <MuiPickersUtilsProvider utils={DayJSUtils} libInstance={dayjs}>
            <div className={classes.createBooking}>
                <Card
                    elevation={0}
                    variant={
                        theme.palette.type === ThemeType.Dark
                            ? "elevation"
                            : "outlined"
                    }
                >
                    <CardContent>
                        <Typography
                            className={classnames(
                                utilStyles.textCenter,
                                utilStyles.spacingBottom2
                            )}
                            variant="h5"
                        >
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Typography>
                        <Divider className={utilStyles.spacingBottom2} />
                        <div
                            className={classnames(
                                utilStyles.textCenter,
                                utilStyles.spacingBottom2
                            )}
                        >
                            <Typography>Check In</Typography>
                            <DatePicker
                                disableToolbar
                                variant="dialog"
                                format="DD/MM/YYYY"
                                margin="dense"
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
                                shouldDisableDate={shouldDisableDate}
                                autoOk
                                disablePast
                                // disabled={checkInInputDisabled}
                                placeholder="Select Date"
                            />
                        </div>
                        <div
                            className={classnames(
                                utilStyles.textCenter,
                                utilStyles.spacingBottom2
                            )}
                        >
                            <Typography>Check Out</Typography>
                            <DatePicker
                                disableToolbar
                                variant="dialog"
                                format="DD/MM/YYYY"
                                margin="dense"
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
                                shouldDisableDate={shouldDisableCheckoutDate}
                                disablePast
                                // disabled={checkOutInputDisabled}
                                placeholder="Select Date"
                                renderDay={onRenderDay}
                            />
                        </div>
                        <Divider className={utilStyles.spacingBottom2} />
                        <div className={utilStyles.textCenter}>
                            <Button
                                className={utilStyles.spacingBottom2}
                                size="large"
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={onRequestToBook}
                                // disabled={disableBooking}
                            >
                                Request to book!
                            </Button>
                            <Typography color="error">
                                {buttonMessage}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
                {checkInDate && checkOutDate ? (
                    <ListingCreateBookingModal
                        isOpen={isOpen}
                        onClose={onClose}
                        listing={data}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        onBookingCompleted={clearBookingData}
                    />
                ) : null}
            </div>
        </MuiPickersUtilsProvider>
    );
};
