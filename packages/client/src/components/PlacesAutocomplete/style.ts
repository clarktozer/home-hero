import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2)
    },
    title: {
        fontWeight: 400
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(
            theme.palette.type === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
            0.05
        ),
        "&:hover": {
            backgroundColor: fade(
                theme.palette.type === "dark"
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                0.1
            )
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1)
        },
        display: "flex",
        alignItems: "center"
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "30ch"
    }
}));
