import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
    imagePicker: {
        width: theme.spacing(16),
        height: theme.spacing(16)
    },
    image: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(1)
    },
    addImage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        cursor: "pointer"
    },
    errorBorder: {
        border: "1px solid",
        borderColor: theme.palette.error.main
    },
    imagePickerContainer: {
        "&:focus": {
            outline: "none"
        },
        "&:focus div": {
            outlineColor: theme.palette.primary.main,
            outlineStyle: "solid",
            outlineWidth: "1px"
        }
    }
}));
