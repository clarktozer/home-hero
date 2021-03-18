import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    spinner: {
        width: "15px",
        height: "15px"
    },
    spinnerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));
