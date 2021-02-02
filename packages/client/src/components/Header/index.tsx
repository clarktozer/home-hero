import { DarkTheme, useStyletron } from "baseui";
import { AppNavBar, NavItemT } from "baseui/app-nav-bar";
import { ArrowUp } from "baseui/icon";
import React, { FC, useState } from "react";
import { CgDarkMode, CgLogOut, CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { Affix } from "../Affix";
import { FlexCenter } from "../FlexCenter";
import { SearchBox } from "./components";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme }) => {
    const history = useHistory();
    const [, theme] = useStyletron();
    const [mainItems] = useState<NavItemT[]>([
        {
            label: "Host",
            info: {
                to: "/host",
            },
        },
    ]);

    const handleLogOut = () => {
        console.log("logout");
    };

    const userItems: NavItemT[] = [
        {
            icon: CgProfile,
            label: "Profile",
            info: () => {
                history.push("/profile");
            },
        },
        {
            icon: CgDarkMode,
            label: theme === DarkTheme ? "Light Theme" : "Dark Theme",
            info: onToggleTheme,
        },
        {
            icon: CgLogOut,
            label: "Logout",
            info: handleLogOut,
        },
    ];

    const onMainItemSelect = (item: NavItemT) => {
        if (item.info?.to) {
            history.push(item.info.to);
        }
    };

    const onUserItemSelect = (item: NavItemT) => {
        if (item.info) {
            item.info();
        }
    };

    const title = (
        <FlexCenter>
            <ArrowUp />
            <SearchBox />
        </FlexCenter>
    );

    return (
        <Affix>
            <AppNavBar
                title={title}
                mainItems={mainItems}
                onMainItemSelect={onMainItemSelect}
                username="Clark Tozer"
                usernameSubtitle="email@email.com"
                userItems={userItems}
                onUserItemSelect={onUserItemSelect}
            />
        </Affix>
    );
};
