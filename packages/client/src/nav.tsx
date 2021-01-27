import { useStyletron } from "baseui";
import { AppNavBar, NavItemT, setItemActive } from "baseui/app-nav-bar";
import { Overflow, Upload } from "baseui/icon";
import React, { FC, useState } from "react";
import "./App.css";

export const Navigation: FC = ({ children }) => {
    const [css, theme] = useStyletron();

    const [mainItems, setMainItems] = useState<NavItemT[]>([
        { icon: Upload, label: "Main A" },
    ]);

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
                onMainItemSelect={(item) => {
                    setMainItems((prev) => setItemActive(prev, item));
                }}
                username="Umka Marshmallow"
                usernameSubtitle="5 Stars"
                userItems={[
                    { icon: Overflow, label: "User A" },
                    { icon: Overflow, label: "User B" },
                ]}
                onUserItemSelect={(item) => console.log(item)}
            />
        </div>
    );
};
