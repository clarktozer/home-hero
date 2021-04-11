import { makeStyles } from "@material-ui/core";

export const useUtilStyles = makeStyles(theme => ({
    centerPage: {
        flex: "auto",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    textCenter: {
        textAlign: "center"
    },
    spacingTop2: {
        marginTop: theme.spacing(2)
    },
    flexCenter: {
        display: "flex",
        alignItems: "center"
    },
    spacingRight1: {
        marginRight: theme.spacing(1)
    }
}));