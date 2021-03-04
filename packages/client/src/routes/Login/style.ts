import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    loginPage: {
        flex: "auto",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    loginCard: {
        maxWidth: "24rem",
        textAlign: "center"
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
    }
}));
