import {
    Badge,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    CardMedia,
    Icon,
    Tooltip,
    Typography
} from "@material-ui/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { formatListingPrice } from "../../utils";
import { ListingType } from "../../__types/global";
import { useStyles } from "./style";
import { ListingCardProps } from "./types";

export const ListingCard: FC<ListingCardProps> = ({ data }) => {
    const classes = useStyles();
    const { id, title, image, address, price, guests, type } = data;
    const isHouse = type === ListingType.HOUSE;

    const icon = isHouse ? <Icon>house</Icon> : <Icon>apartment</Icon>;

    const subHeader = (
        <>
            {formatListingPrice(price)}
            <span>/day</span>
            <Typography variant="body2">{address}</Typography>
        </>
    );

    return (
        <Link className={classes.listingCard} to={`/listing/${id}`}>
            <Card>
                <CardActionArea>
                    <CardMedia component="img" image={image} height="195px" />
                    <CardHeader title={title} subheader={subHeader} />
                    <CardActions className={classes.actions}>
                        <Tooltip title={isHouse ? "House" : "Apartment"}>
                            {icon}
                        </Tooltip>
                        <Tooltip title={`Maximum of ${guests} guests`}>
                            <Badge
                                className={classes.guests}
                                badgeContent={guests}
                                color="primary"
                            >
                                <Icon>person</Icon>
                            </Badge>
                        </Tooltip>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Link>
    );
};
