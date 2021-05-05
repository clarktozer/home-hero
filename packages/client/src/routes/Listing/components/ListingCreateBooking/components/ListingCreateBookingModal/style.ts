import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    stripe: {
        padding: "10px"
    },
    help: {
        fontSize: theme.typography.fontSize,
        lineHeight: theme.typography.body1.lineHeight,
        verticalAlign: "top",
        height: "100%"
    },
    total: {
        fontSize: "16px"
    }
}));
