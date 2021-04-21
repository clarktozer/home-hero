import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    actionBar: {
        paddingBottom: theme.spacing(4),
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    },
    pagination: {
        display: "block",
        flex: 1,
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "flex",
            marginTop: 0
        }
    }
}));
