import axios from "axios";
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from "type-graphql";
import { FindOneOptions, getRepository, In } from "typeorm";
import { Cloudinary, Google } from "../../../api";
import { isAuthorized } from "../../../auth";
import { AppContext } from "../../../middlewares/apollo/types";
import { Booking, Listing, User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { BookingDataResponse, PaginationArgs } from "../types";
import {
    GoogleRecaptchaResponse,
    HostListingArgs,
    ListingsArgs,
    ListingsData,
    ListingsFilter,
    ListingsQuery
} from "./types";

@Resolver(Listing)
export class ListingResolver {
    @Query(() => Listing)
    async listing(
        @Ctx() ctx: AppContext,
        @Arg("id") id: string
    ): Promise<Listing> {
        try {
            const listing = await Listing.findOne(id);

            if (!listing) {
                throw new Error("Listing can't be found");
            }

            if (isAuthorized(ctx.req) && ctx.req.user?.id === listing.hostId) {
                listing.authorized = true;
            }

            return listing;
        } catch (error) {
            throw new Error(`Failed to query user: ${error}`);
        }
    }

    @Query(() => ListingsData)
    async listings(@Args() input: ListingsArgs): Promise<ListingsData> {
        try {
            const { filter, limit, location, page } = input;
            const query: ListingsQuery = {};
            const data: ListingsData = {
                region: null,
                total: 0,
                result: []
            };

            if (location) {
                const { country, admin, city } = await Google.geocode(location);

                if (city) {
                    query.city = city;
                }

                if (admin) {
                    query.admin = admin;
                }

                if (country) {
                    query.country = country;
                } else {
                    throw new Error("No country found");
                }

                const cityText = city ? `${city}, ` : "";
                const adminText = admin ? `${admin}, ` : "";

                data.region = `${cityText}${adminText}${country}`;
            }

            const repository = getRepository(Listing);

            const order: FindOneOptions<Listing>["order"] = {};

            if (filter) {
                if (
                    filter === ListingsFilter.TITLE_ASC ||
                    filter === ListingsFilter.TITLE_DESC
                ) {
                    order.title = filter === ListingsFilter.TITLE_ASC ? 1 : -1;
                }
                if (
                    filter === ListingsFilter.PRICE_LOW_TO_HIGH ||
                    filter === ListingsFilter.PRICE_HIGH_TO_LOW
                ) {
                    order.price =
                        filter === ListingsFilter.PRICE_LOW_TO_HIGH ? 1 : -1;
                }
            }

            const [items, count] = await repository.findAndCount({
                where: query,
                skip: page > 0 ? (page - 1) * limit : 0,
                take: limit,
                order
            });

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query listings: ${error}`);
        }
    }

    @Mutation(() => Listing)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async hostListing(
        @Ctx() ctx: AppContext,
        @Arg("input") input: HostListingArgs
    ): Promise<Listing | null> {
        try {
            const { data } = await axios.post<GoogleRecaptchaResponse>(
                "https://www.google.com/recaptcha/api/siteverify",
                undefined,
                {
                    params: {
                        secret: `${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}`,
                        response: input.recaptcha
                    },
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded; charset=utf-8"
                    }
                }
            );

            if (!data.success) {
                throw new Error("Failed recaptcha validation");
            }

            const user = await User.findOne(ctx.req.user!.id);

            if (!user) {
                throw new Error("User could not be found");
            }

            const { country, admin, city, lat, lng } = await Google.geocode(
                input.address
            );

            if (!country || !admin || !city) {
                throw new Error("Invalid address input");
            }

            const imageUrl = await Cloudinary.upload(input.image);

            const listing = Listing.create({
                ...input,
                image: imageUrl,
                country,
                admin,
                city,
                lat,
                lng,
                hostId: user.id
            });

            await listing.save();

            return listing;
        } catch (error) {
            throw new Error(`Failed to create listing: ${error}`);
        }
    }

    @FieldResolver()
    async host(@Root() listing: Listing) {
        const host = await User.findOne(listing.hostId);

        if (!host) {
            throw new Error("Host can't be found");
        }

        return host;
    }

    @FieldResolver(() => BookingDataResponse, {
        nullable: true
    })
    async bookings(
        @Root() listing: Listing,
        @Args() input: PaginationArgs
    ): Promise<BookingDataResponse | null> {
        try {
            if (!listing.authorized) {
                return null;
            }

            const { limit, page } = input;
            const repository = getRepository(Booking);

            const data: BookingDataResponse = {
                total: 0,
                result: []
            };

            const [items, count] = await repository.findAndCount({
                skip: page > 0 ? (page - 1) * limit : 0,
                take: limit,
                where: {
                    id: In(listing.bookingIds)
                }
            });

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query listing bookings: ${error}`);
        }
    }
}
