import { FC } from "react";
import { SocialLoginButton } from "../..";
import { useStyles } from "./style";
import { svg } from "./svg";

export const GithubLoginButton: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <SocialLoginButton
            className={classes.githubLogin}
            color="default"
            icon={svg}
            href={`${process.env.REACT_APP_API_ENDPOINT}/auth/github`}
        >
            {children}
        </SocialLoginButton>
    );
};
