import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Icon,
    Typography
} from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useUtilStyles } from "../../../../utils";
import dubaiImage from "../../assets/dubai.jpg";
import londonImage from "../../assets/london.jpg";
import losAngelesImage from "../../assets/los-angeles.jpg";
import torontoImage from "../../assets/toronto.jpg";
import { useStyles } from "./style";

export const FeaturedRegions: FC = () => {
    const classes = useStyles();
    const utilClasses = useUtilStyles();

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Link className={classes.regionCard} to="/listings/Toronto">
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={torontoImage}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        className={utilClasses.flexCenter}
                                    >
                                        <Icon
                                            className={utilClasses.marginRight1}
                                        >
                                            location_on
                                        </Icon>
                                        Toronto
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Link className={classes.regionCard} to="/listings/Dubai">
                        <Card>
                            <CardActionArea>
                                <CardMedia component="img" image={dubaiImage} />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        className={utilClasses.flexCenter}
                                    >
                                        <Icon
                                            className={utilClasses.marginRight1}
                                        >
                                            location_on
                                        </Icon>
                                        Dubai
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Link className={classes.regionCard} to="/listings/London">
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={londonImage}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        className={utilClasses.flexCenter}
                                    >
                                        <Icon
                                            className={utilClasses.marginRight1}
                                        >
                                            location_on
                                        </Icon>
                                        London
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Link
                        className={classes.regionCard}
                        to="/listings/Los%20Angeles"
                    >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={losAngelesImage}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        className={utilClasses.flexCenter}
                                    >
                                        <Icon
                                            className={utilClasses.marginRight1}
                                        >
                                            location_on
                                        </Icon>
                                        Los Angeles
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};
