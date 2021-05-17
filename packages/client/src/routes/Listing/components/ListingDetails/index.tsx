import { useMutation } from "@apollo/client";
import {
    Avatar,
    Chip,
    CircularProgress,
    Divider,
    Icon,
    IconButton,
    Link,
    Tooltip,
    Typography,
    useTheme
} from "@material-ui/core";
import { GoogleMap, Marker } from "@react-google-maps/api";
import classnames from "classnames";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { MapDarkMode, ThemeType } from "../../../../constants";
import { FAVOURITE_LISTING } from "../../../../graphql/mutations/FavoriteListing";
import { useUtilStyles } from "../../../../utils";
import {
    FavoriteListing as FavoriteListingData,
    FavoriteListingVariables
} from "../../../../__types/FavoriteListing";
import { useStyles } from "./style";
import { ListingDetailsProps } from "./types";

export const ListingDetails: FC<ListingDetailsProps> = ({ data }) => {
    const utilStyles = useUtilStyles();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const mapOptions =
        theme.palette.type === ThemeType.Dark
            ? { styles: MapDarkMode }
            : { styles: [] };
    const {
        id,
        title,
        description,
        image,
        type,
        address,
        city,
        guests,
        host,
        lat,
        lng,
        favourited,
        admin,
        country
    } = data;

    const [favoriteListing, { loading, data: favData }] = useMutation<
        FavoriteListingData,
        FavoriteListingVariables
    >(FAVOURITE_LISTING, {
        onError: () => {
            enqueueSnackbar(
                "Sorry! We weren't able to favorite this listing. Please try again later!",
                {
                    variant: "error"
                }
            );
        }
    });

    const isFavorited = favData ? favData.favoriteListing : favourited;

    const onGoToListings = () => {
        history.push(`/listings/${city},${admin},${country}`);
    };

    const onFavoriteListing = () => {
        favoriteListing({
            variables: {
                id,
                favorite: !isFavorited
            }
        });
    };

    return (
        <div>
            <div
                className={classnames(utilStyles.marginBottom3, classes.image)}
                style={{
                    backgroundImage: `url(${image})`
                }}
            >
                <div className={classes.favorite}>
                    <Tooltip
                        title={
                            isFavorited
                                ? "Unfavorite this listing"
                                : "Favorite this listing"
                        }
                    >
                        <IconButton
                            color="inherit"
                            onClick={!loading ? onFavoriteListing : undefined}
                        >
                            {loading ? (
                                <CircularProgress
                                    size="24px"
                                    color="secondary"
                                />
                            ) : isFavorited ? (
                                <Icon>favorite</Icon>
                            ) : (
                                <Icon>favorite_border</Icon>
                            )}
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={utilStyles.marginBottom3}>
                <div
                    className={classnames(utilStyles.flexCenter, classes.basic)}
                >
                    <Chip
                        className={classnames(
                            utilStyles.marginRight1,
                            classes.location
                        )}
                        icon={<Icon>location_on</Icon>}
                        label={city}
                        color="primary"
                        onClick={onGoToListings}
                    />
                    <Typography variant="body2">
                        <Divider orientation="vertical" component="span" />
                        {address}
                    </Typography>
                </div>
                <Typography className={utilStyles.marginTop2} variant="h5">
                    {title}
                </Typography>
            </div>
            <Divider className={utilStyles.marginBottom3} />
            <div className={utilStyles.marginBottom3}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/user/${host.id}`}
                >
                    <div className={utilStyles.flexCenter}>
                        <Avatar
                            className={classnames(
                                utilStyles.marginRight1,
                                classes.avatar
                            )}
                            src={host.avatar}
                        />
                        <Typography>{host.name}</Typography>
                    </div>
                </Link>
            </div>
            <Divider className={utilStyles.marginBottom3} />
            <div className={utilStyles.marginBottom3}>
                <Typography gutterBottom variant="h6">
                    About this space
                </Typography>
                <div className={utilStyles.marginBottom2}>
                    <Chip
                        size="small"
                        className={utilStyles.marginRight1}
                        color="secondary"
                        label={type.toLowerCase()}
                    />
                    <Chip
                        size="small"
                        color="secondary"
                        label={`${guests} Guests`}
                    />
                </div>
                <Typography variant="body1">{description}</Typography>
            </div>
            <div>
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "300px"
                    }}
                    center={{
                        lat,
                        lng
                    }}
                    zoom={15}
                    options={mapOptions}
                >
                    <Marker
                        position={{
                            lat,
                            lng
                        }}
                    />
                </GoogleMap>
            </div>
        </div>
    );
};
