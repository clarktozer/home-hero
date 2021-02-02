import {
    Alignment,
    Button,
    InputGroup,
    Menu,
    MenuDivider,
    MenuItem,
    Navbar,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { HeaderProps } from "./types";

const { Divider, Group, Heading } = Navbar;

export const Header: FC<HeaderProps> = ({ onToggleTheme, isDarkTheme }) => {
    const history = useHistory();

    return (
        <Navbar fixedToTop>
            <Group align={Alignment.LEFT}>
                <Heading>Blueprint</Heading>
                <InputGroup leftIcon="search" placeholder="Search..." />
            </Group>
            <Group align={Alignment.RIGHT}>
                <Link to="/host">
                    <Button large minimal icon="home" text="Host" />
                </Link>
                <Divider />
                <Button large minimal icon="user" />
                <Button large minimal icon="log-in" text="Login" />
                <Popover2
                    placement="bottom-end"
                    content={
                        <Menu>
                            <MenuItem icon="user" text="Profile" />
                            <MenuItem
                                icon={isDarkTheme ? "flash" : "moon"}
                                text={
                                    isDarkTheme ? "Light Theme" : "Dark Theme"
                                }
                                onClick={onToggleTheme}
                            />
                            <MenuDivider />
                            <MenuItem icon="log-out" text="Logout" />
                        </Menu>
                    }
                >
                    <Button minimal large icon="user" text="Clark Tozer" />
                </Popover2>
            </Group>
        </Navbar>
    );
};
