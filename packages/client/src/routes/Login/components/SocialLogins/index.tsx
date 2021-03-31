import React, { FC } from "react";
import { SocialLoginButton } from "../SocialLoginButton";
import { useStyles } from "./style";
import { facebookSvg, githubSvg, googleSvg } from "./svgs";
import { SocialLoginsProps } from "./types";

export const SocialLogins: FC<SocialLoginsProps> = ({ onClick }) => {
    const classes = useStyles();
    const redirectUrl = new URL(window.location.href).searchParams.get(
        "redirect"
    );
    const query = redirectUrl ? `?redirect=${redirectUrl}` : "";

    return (
        <div className={classes.loginButtons}>
            <SocialLoginButton
                className={classes.googleLogin}
                color="default"
                icon={googleSvg}
                href={`${process.env.REACT_APP_API_ENDPOINT}/auth/google${query}`}
                onClick={onClick}
            >
                Sign in with Google
            </SocialLoginButton>
            <SocialLoginButton
                className={classes.facebookLogin}
                color="default"
                icon={facebookSvg}
                href={`${process.env.REACT_APP_API_ENDPOINT}/auth/facebook${query}`}
                onClick={onClick}
            >
                Sign in with Facebook
            </SocialLoginButton>
            <SocialLoginButton
                className={classes.githubLogin}
                color="default"
                icon={githubSvg}
                href={`${process.env.REACT_APP_API_ENDPOINT}/auth/github${query}`}
                onClick={onClick}
            >
                Sign in with Github
            </SocialLoginButton>
        </div>
    );
};
