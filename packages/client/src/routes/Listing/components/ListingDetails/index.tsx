import {
    Avatar,
    Chip,
    Divider,
    Icon,
    Link,
    Typography,
    useTheme
} from "@material-ui/core";
import { GoogleMap, Marker } from "@react-google-maps/api";
import classnames from "classnames";
import React, { FC } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { MapDarkMode, ThemeType } from "../../../../constants";
import { useUtilStyles } from "../../../../utils";
import { useStyles } from "./style";
import { ListingDetailsProps } from "./types";

export const ListingDetails: FC<ListingDetailsProps> = ({ data }) => {
    const utilStyles = useUtilStyles();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mapOptions =
        theme.palette.type === ThemeType.Dark
            ? { styles: MapDarkMode }
            : { styles: [] };
    const {
        title,
        description,
        image,
        type,
        address,
        city,
        guests,
        host,
        lat,
        lng
    } = data;

    const onGoToListings = () => {
        history.push(`/listings/${city}`);
    };

    return (
        <div>
            <div
                className={classnames(utilStyles.spacingBottom3, classes.image)}
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
            <div className={utilStyles.spacingBottom3}>
                <div
                    className={classnames(utilStyles.flexCenter, classes.basic)}
                >
                    <Chip
                        className={classnames(
                            utilStyles.spacingRight1,
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
                <Typography className={utilStyles.spacingTop2} variant="h5">
                    {title}
                </Typography>
            </div>
            <Divider className={utilStyles.spacingBottom3} />
            <div className={utilStyles.spacingBottom3}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/user/${host.id}`}
                >
                    <div className={utilStyles.flexCenter}>
                        <Avatar
                            className={classnames(
                                utilStyles.spacingRight1,
                                classes.avatar
                            )}
                            src={host.avatar}
                        />
                        <Typography>{host.name}</Typography>
                    </div>
                </Link>
            </div>
            <Divider className={utilStyles.spacingBottom3} />
            <div className={utilStyles.spacingBottom3}>
                <Typography gutterBottom variant="h6">
                    About this space
                </Typography>
                <div className={utilStyles.spacingBottom2}>
                    <Chip
                        size="small"
                        className={utilStyles.spacingRight1}
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
