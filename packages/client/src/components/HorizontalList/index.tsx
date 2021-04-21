import { Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import classnames from "classnames";
import React from "react";
import { useUtilStyles } from "../../utils";
import { useStyles } from "./style";
import { HorizontalListProps } from "./types";

export function HorizontalList<T>({
    title,
    loading,
    data,
    onPageChange,
    page,
    limit,
    total,
    noResultText,
    onRenderItem,
    onRenderLoader
}: HorizontalListProps<T>) {
    const utilClasses = useUtilStyles();
    const classes = useStyles();

    const onPaginationChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        onPageChange(newPage);
    };

    return (
        <div>
            <div
                className={classnames(
                    utilClasses.flexCenter,
                    classes.actionBar
                )}
            >
                <Typography gutterBottom variant="h5">
                    {title}
                </Typography>
                {total > limit && (
                    <Pagination
                        className={classes.pagination}
                        size="large"
                        count={Math.ceil(total / limit)}
                        page={page}
                        color="primary"
                        onChange={onPaginationChange}
                    />
                )}
            </div>
            {loading ? (
                onRenderLoader()
            ) : data.length > 0 ? (
                <Grid container spacing={4}>
                    {data.map(item => onRenderItem(item))}
                </Grid>
            ) : (
                <Typography>{noResultText}</Typography>
            )}
        </div>
    );
}
