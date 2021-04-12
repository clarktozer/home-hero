import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    appContainer: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flex: "auto",
        flexDirection: "column"
    },
    contentContainer: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        display: "flex",
        flex: 1,
        flexDirection: "column"
    }
}));
