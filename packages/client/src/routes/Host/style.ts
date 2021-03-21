import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        "& .MuiFormControl-root": {
            marginBottom: theme.spacing(2)
        }
    },
    toggleButton: {
        width: "150px",
        borderColor:
            theme.palette.type === "dark"
                ? "rgba(255, 255, 255, 0.23)"
                : "rgba(0, 0, 0, 0.23)"
    },
    toggleButtonLabel: {
        marginLeft: theme.spacing(1)
    },
    toggleGroupError: {
        "& .MuiToggleButton-root": {
            borderColor: theme.palette.error.main
        }
    },
    helperText: {
        display: "block",
        color: theme.palette.text.secondary
    },
    formLabel: {
        marginBottom: theme.spacing(2)
    },
    hostHeader: {
        paddingBottom: theme.spacing(3)
    },
    hostContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 100px",
        maxWidth: "900px",
        margin: "0 auto"
    },
    fieldSet: {
        "&:focus": {
            outline: "none"
        }
    }
}));
