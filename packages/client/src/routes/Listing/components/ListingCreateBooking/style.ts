import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    createBooking: {
        maxWidth: "400px",
        margin: "0 auto",
        display: "block",
        [theme.breakpoints.up("md")]: {
            position: "sticky",
            top: `${theme.spacing(4) + 64}px`
        }
    },
    checkInDate: {
        backgroundColor: theme.palette.secondary.main
    }
}));
