import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    media: {
        height: 195
    },
    actions: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    guests: {
        marginLeft: "auto !important"
    }
}));
