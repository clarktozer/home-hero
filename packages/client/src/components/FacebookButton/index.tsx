import { Button } from "@material-ui/core";
import { FC } from "react";
import { useStyles } from "./style";
import { svg } from "./svg";

export const FacebookButton: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Button
            className={classes.root}
            size="medium"
            color="default"
            variant="contained"
            startIcon={svg}
            disableElevation
            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/facebook`}
        >
            {children}
        </Button>
    );
};
