import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
        textTransform: "none",
        backgroundColor: "#fff",
        border: "1px solid #b0b0b0",
        "&:hover": {
            backgroundColor: "#EBEBEB"
        },
        marginBottom: "16px"
    }
}));
