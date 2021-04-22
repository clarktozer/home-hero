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
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { MapDarkMode, ThemeType } from "../../../../constants";
import { ListingDetailsProps } from "./types";

export const ListingDetails: FC<ListingDetailsProps> = ({ data }) => {
    const theme = useTheme();
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

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${image})`,

                    width: "100%",
                    height: "570px",
                    backgroundSize: "cover",
                    backgroundPosition: "50%"
                }}
            />
            <div>
                <Typography>
                    <Link
                        color="secondary"
                        component={RouterLink}
                        to={`/listings/${city}`}
                    >
                        <Icon>location_on</Icon>
                        {city}
                    </Link>
                    <Divider orientation="vertical" component="span" />
                    {address}
                </Typography>
                <Typography>{title}</Typography>
            </div>
            <Divider />
            <div>
                <Link
                    color="secondary"
                    component={RouterLink}
                    to={`/user/${host.id}`}
                >
                    <Avatar src={host.avatar} />
                    <Typography>{host.name}</Typography>
                </Link>
            </div>
            <Divider />
            <div>
                <Typography>About this space</Typography>
                <div>
                    <Chip color="secondary" label={type.toLowerCase()} />
                    <Chip color="secondary" label={`${guests} Guests`} />
                </div>
                <Typography>{description}</Typography>
            </div>
            <div>
                <GoogleMap
                    id={theme.palette.type}
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
