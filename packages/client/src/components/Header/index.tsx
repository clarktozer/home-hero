import { useStyletron } from "baseui";
import { AppNavBar, NavItemT, setItemActive } from "baseui/app-nav-bar";
import { Overflow, Upload } from "baseui/icon";
import React, { FC, useState } from "react";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ onToggleTheme }) => {
    const [css] = useStyletron();

    const [mainItems, setMainItems] = useState<NavItemT[]>([
        { icon: Upload, label: "Main A" },
        { icon: Upload, label: "Toggle Theme", info: "theme" },
    ]);

    const onMainItemSelect = (item: NavItemT) => {
        if (item.info === "theme") {
            onToggleTheme();
        }

        setMainItems((prev) => setItemActive(prev, item));
    };

    return (
        <div
            className={css({
                position: "fixed",
                width: "100%",
                top: 0,
            })}
        >
            <AppNavBar
                title="Title"
                mainItems={mainItems}
                onMainItemSelect={onMainItemSelect}
                username="Umka Marshmallow"
                usernameSubtitle="5 Stars"
                userItems={[
                    { icon: Overflow, label: "User A" },
                    { icon: Overflow, label: "User B" },
                ]}
            />
        </div>
    );
};
