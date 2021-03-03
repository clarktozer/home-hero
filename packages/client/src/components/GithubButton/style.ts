import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: {
        color: "#fff",
        textTransform: "none",
        backgroundColor: "#2f3337",
        "&:hover": {
            backgroundColor: "#242729"
        }
    }
}));
