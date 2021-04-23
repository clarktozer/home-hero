import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    avatar: {
        width: "50px",
        height: "50px"
    },
    image: {
        width: "100%",
        height: "380px",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        [theme.breakpoints.up("lg")]: {
            height: "570px"
        },
        position: "relative"
    },
    basic: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    },
    location: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            marginBottom: 0
        }
    },
    favorite: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        borderRadius: "50%",
        background: theme.palette.primary.main,
        color: theme.palette.common.white
    }
}));
