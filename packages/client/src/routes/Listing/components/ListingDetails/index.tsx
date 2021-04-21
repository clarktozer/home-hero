import {
    Avatar,
    Chip,
    Divider,
    Icon,
    Link,
    Typography
} from "@material-ui/core";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListingDetailsProps } from "./types";

export const ListingDetails: FC<ListingDetailsProps> = ({ data }) => {
    const {
        title,
        description,
        image,
        type,
        address,
        city,
        guests,
        host
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
                <Link component={RouterLink} to={`/user/${host.id}`}>
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
            <div>map</div>
        </div>
    );
};
