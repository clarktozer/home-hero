import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 24
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    media: {
        height: 0,
        paddingTop: "100px" // 16:9
    }
}));
