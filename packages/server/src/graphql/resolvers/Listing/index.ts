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
import { FindOneOptions, getRepository } from "typeorm";
import { Cloudinary, Google } from "../../../api";
import { isAuthorized } from "../../../auth";
import { AppContext } from "../../../middlewares/apollo/types";
import { Listing, User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { ListingDataResponse, PaginationArgs } from "../types";
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
                throw new Error("User can't be found");
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

    @Mutation(() => Boolean)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async favoriteListing(
        @Ctx() ctx: AppContext,
        @Arg("id") id: string,
        @Arg("favorite") favorite: boolean
    ): Promise<Boolean | null> {
        try {
            const listing = await Listing.findOne(id);

            if (!listing) {
                throw new Error("Listing can't be found");
            }

            const user = await User.findOne(ctx.req.user!.id);

            if (!user) {
                throw new Error("User can't be found");
            }

            let favoritedBy = await listing.favoritedBy;

            if (!favorite) {
                favoritedBy = favoritedBy.filter(
                    favUser => favUser.id !== user.id
                );
            } else {
                favoritedBy.push(user);
            }

            listing.favoritedBy = Promise.resolve(favoritedBy);

            await listing.save();

            return favorite;
        } catch (error) {
            throw new Error(`Failed to favorite listing: ${error}`);
        }
    }

    @Query(() => ListingDataResponse)
    async listingsForUser(
        @Arg("userId") userId: string,
        @Args() input: PaginationArgs
    ): Promise<ListingDataResponse> {
        try {
            const { limit, page } = input;
            const repository = getRepository(Listing);

            const data: ListingDataResponse = {
                total: 0,
                result: []
            };

            const [items, count] = await repository.findAndCount({
                skip: page > 0 ? (page - 1) * limit : 0,
                take: limit,
                where: {
                    hostId: userId
                }
            });

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query listings for user: ${error}`);
        }
    }

    @Query(() => ListingDataResponse, {
        nullable: true
    })
    async favouriteListingsForUser(
        @Ctx() ctx: AppContext,
        @Arg("userId") userId: string,
        @Args() input: PaginationArgs
    ): Promise<ListingDataResponse | null> {
        try {
            if (!isAuthorized(ctx.req) || ctx.req.user?.id !== userId) {
                return null;
            }

            const { limit, page } = input;
            const repository = getRepository(Listing);

            const data: ListingDataResponse = {
                total: 0,
                result: []
            };

            const [items, count] = await repository
                .createQueryBuilder("listing")
                .innerJoin("listing.favoritedBy", "user", "user.id = :id", {
                    id: userId
                })
                .take(limit)
                .skip(page > 0 ? (page - 1) * limit : 0)
                .getManyAndCount();

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query favorite listings: ${error}`);
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

    @FieldResolver(() => Boolean, {
        nullable: true
    })
    async favourited(@Ctx() ctx: AppContext, @Root() listing: Listing) {
        if (ctx.req.user?.id) {
            const repository = getRepository(Listing);

            const count = await repository
                .createQueryBuilder("listing")
                .innerJoin("listing.favoritedBy", "user", "user.id = :id", {
                    id: ctx.req.user.id
                })
                .where("listing.id = :uid", { uid: listing.id })
                .getCount();

            return count > 0;
        } else {
            return null;
        }
    }
}
