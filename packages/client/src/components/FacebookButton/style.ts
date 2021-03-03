import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
        color: "#fff",
        textTransform: "none",
        backgroundColor: "#385499",
        "&:hover": {
            backgroundColor: "#314a86"
        },
        marginBottom: "16px"
    }
}));
