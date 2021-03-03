import { Card, CardContent, Icon } from "@material-ui/core";
import React, { FC } from "react";
import { FacebookButton } from "../../components/FacebookButton";
import { GithubButton } from "../../components/GithubButton";
import { GoogleButton } from "../../components/GoogleButton";

export const Login: FC = () => {
    return (
        <div
            style={{
                flex: "auto",
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    maxWidth: "24rem",
                    textAlign: "center"
                }}
            >
                <Card elevation={0}>
                    <CardContent>
                        <Icon color="inherit">hotel</Icon>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "16px"
                            }}
                        >
                            <GoogleButton>Sign in with Google</GoogleButton>
                            <FacebookButton>
                                Sign in with Facebook
                            </FacebookButton>
                            <GithubButton>Sign in with Github</GithubButton>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
