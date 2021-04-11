import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    listingCard: {
        textDecoration: "none",
        display: "block"
    },
    guests: {
        marginLeft: "auto !important"
    },
    actions: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));
