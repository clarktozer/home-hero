import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    confirmed: {
        marginLeft: theme.spacing(1)
    }
}));
