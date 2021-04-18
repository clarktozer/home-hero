import { Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import classnames from "classnames";
import React, { FC } from "react";
import { useUtilStyles } from "../../utils";
import { GridListingCardSkeletons } from "../GridListingCardSkeletons";
import { ListingCard } from "../ListingCard";
import { useStyles } from "./style";
import { ListingsSectionProps } from "./types";

export const ListingsSection: FC<ListingsSectionProps> = ({
    title,
    loading,
    data,
    onPageChange,
    page,
    limit,
    total,
    noResultText
}) => {
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
            <>
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
                    <GridListingCardSkeletons />
                ) : data.length > 0 ? (
                    <Grid container spacing={4}>
                        {data.map(item => (
                            <Grid item key={item.id} xs={12} sm={6} md={3}>
                                <ListingCard data={item} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography className={utilClasses.textCenter}>
                        {noResultText}
                    </Typography>
                )}
            </>
        </div>
    );
};
