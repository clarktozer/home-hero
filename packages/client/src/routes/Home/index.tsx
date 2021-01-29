import { useStyletron } from "baseui";
import { Cell, Grid } from "baseui/layout-grid";
import React, { FC } from "react";

export const Home: FC = () => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                paddingTop: "72px",
            })}
        >
            <Grid>
                <Cell>
                    <div
                        className={css({
                            color: theme.colors.accent,
                            height: "500px",
                        })}
                    >
                        Example
                    </div>
                </Cell>
                <Cell>
                    <div
                        className={css({
                            color: theme.colors.accent,
                            height: "500px",
                        })}
                    >
                        Example
                    </div>
                </Cell>
                <Cell>
                    <div
                        className={css({
                            color: theme.colors.accent,
                            height: "500px",
                        })}
                    >
                        Example
                    </div>
                </Cell>
            </Grid>
        </div>
    );
};
