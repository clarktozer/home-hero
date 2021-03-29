import { FC } from "react";
import { SocialLoginButton } from "../..";
import { useStyles } from "./style";
import { svg } from "./svg";
import { GoogleLoginButtonProps } from "./types";

export const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
    children,
    onClick
}) => {
    const classes = useStyles();

    return (
        <SocialLoginButton
            className={classes.googleLogin}
            color="default"
            icon={svg}
            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/google`}
            onClick={onClick}
        >
            {children}
        </SocialLoginButton>
    );
};
