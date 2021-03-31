import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    googleLogin: {
        border: "1px solid #b0b0b0"
    },
    githubLogin: {
        color: "#fff",
        backgroundColor: "#2f3337",
        "&:hover": {
            backgroundColor: "#242729"
        }
    },
    facebookLogin: {
        color: "#fff",
        backgroundColor: "#385499",
        "&:hover": {
            backgroundColor: "#314a86"
        }
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
