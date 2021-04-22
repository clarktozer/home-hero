import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    avatar: {
        flex: "0 0 auto",
        marginRight: theme.spacing(2)
    },
    name: {
        flex: "1 1 auto"
    }
}));
