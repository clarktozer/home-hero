import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    confirmed: {
        marginLeft: theme.spacing(1)
    },
    userProfileCard: {
        margin: "0 auto",
        maxWidth: "400px",
        position: "relative"
    }
}));
