import { useStyletron } from "baseui";
import { Cell, Grid } from "baseui/layout-grid";
import * as React from "react";

export const Content = () => {
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
