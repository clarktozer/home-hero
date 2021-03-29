import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    loginPage: {
        flex: "auto",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    loginCard: {
        maxWidth: "24rem",
        textAlign: "center",
        position: "relative"
    },
    loginButtons: {
        display: "flex",
        flexDirection: "column",
        marginTop: "16px",
        "& a": {
            marginBottom: "16px",
            "&:last-child": {
                marginBottom: "0"
            }
        }
    },
    overlaySpinner: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: ".65",
        background:
            theme.palette.type === "light"
                ? theme.palette.common.white
                : theme.palette.grey[800],
        zIndex: 1
    }
}));
