import { FC } from "react";
import { SocialLoginButton } from "../..";
import { useStyles } from "./style";
import { svg } from "./svg";
import { FacebookLoginButtonProps } from "./types";

export const FacebookLoginButton: FC<FacebookLoginButtonProps> = ({
    children,
    onClick
}) => {
    const classes = useStyles();

    return (
        <SocialLoginButton
            className={classes.facebookLogin}
            color="default"
            icon={svg}
            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/facebook`}
            onClick={onClick}
        >
            {children}
        </SocialLoginButton>
    );
};
