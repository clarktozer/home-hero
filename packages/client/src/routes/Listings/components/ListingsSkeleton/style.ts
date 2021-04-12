import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    bar: {
        paddingBottom: theme.spacing(4),
        display: "flex",
        alignItems: "center"
    },
    pagination: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-end"
    }
}));
