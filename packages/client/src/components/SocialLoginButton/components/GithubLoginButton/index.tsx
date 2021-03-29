import { FC } from "react";
import { SocialLoginButton } from "../..";
import { useStyles } from "./style";
import { svg } from "./svg";
import { GithubLoginButtonProps } from "./types";

export const GithubLoginButton: FC<GithubLoginButtonProps> = ({
    children,
    onClick
}) => {
    const classes = useStyles();

    return (
        <SocialLoginButton
            className={classes.githubLogin}
            color="default"
            icon={svg}
            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/github`}
            onClick={onClick}
        >
            {children}
        </SocialLoginButton>
    );
};
