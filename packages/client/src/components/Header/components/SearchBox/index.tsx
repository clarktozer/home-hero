import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import React, { FC } from "react";
import { SearchBoxProps } from "./types";

export const SearchBox: FC<SearchBoxProps> = () => {
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key === "Enter");
    };

    return (
        <Input
            endEnhancer={<Search size="18px" />}
            placeholder="Input with an icon enhancer"
            clearOnEscape
            clearable
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};
