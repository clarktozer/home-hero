import React, { FC, useLayoutEffect } from "react";
import { useHistory } from "react-router";

export const ScrollToTop: FC = ({ children }) => {
    const history = useHistory();

    useLayoutEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });

        return () => {
            unlisten();
        };
    }, [history]);

    return <>{children}</>;
};
