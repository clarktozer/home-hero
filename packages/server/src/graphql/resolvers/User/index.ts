import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from "type-graphql";
import { getRepository } from "typeorm";
import { Stripe } from "../../../api";
import { ANTI_FORGERY_COOKIE, SESSION_COOKIE } from "../../../constants";
import { AppContext } from "../../../middlewares/apollo/types";
import { Booking, Listing, User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { UserBookingsData, UserListingsData } from "./types";

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
        return ctx.req.user ? User.findOne(ctx.req.user.id) : undefined;
    }

    @Query(() => User)
    async user(@Ctx() ctx: AppContext, @Arg("id") id: string): Promise<User> {
        try {
            const user = await User.findOne(id);

            if (!user) {
                throw new Error("User can't be found");
            }

            if (ctx.req.user && ctx.req.user.id === user.id) {
                user.authorized = true;
            }

            return user;
        } catch (error) {
            throw new Error(`Failed to query user: ${error}`);
        }
    }

    @Mutation(() => Boolean)
    @Authorized()
    async logout(@Ctx() ctx: AppContext): Promise<boolean> {
        return new Promise((response, reject) => {
            ctx.req.logOut();
            ctx.req.session.destroy(err => {
                if (err) {
                    return reject(false);
                }

                ctx.res.clearCookie(ANTI_FORGERY_COOKIE);
                ctx.res.clearCookie(SESSION_COOKIE);

                return response(true);
            });
        });
    }

    @Mutation(() => User)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async connectStripe(
        @Ctx() ctx: AppContext,
        @Arg("code") code: string
    ): Promise<User> {
        try {
            const wallet = await Stripe.connect(code);

            if (!wallet) {
                throw new Error("Stripe grant error");
            }

            const user = await User.findOne(ctx.req.user!.id);

            if (!user) {
                throw new Error("User could not be found");
            }

            user.walletId = wallet.stripe_user_id;

            await user.save();

            return user;
        } catch (error) {
            throw new Error(`Failed to connect with Stripe: ${error}`);
        }
    }

    @Mutation(() => User)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async disconnectStripe(@Ctx() ctx: AppContext): Promise<User> {
        try {
            const user = await User.findOne(ctx.req.user!.id);

            if (!user || !user.walletId) {
                throw new Error(
                    "User cannot be found or has not connected with Stripe"
                );
            }

            const wallet = await Stripe.disconnect(user.walletId);

            if (!wallet) {
                throw new Error("Stripe disconnect error");
            }

            user.walletId = "";

            await user.save();

            return user;
        } catch (error) {
            throw new Error(`Failed to disconnect with Stripe: ${error}`);
        }
    }

    @FieldResolver(() => UserListingsData)
    async listings(
        @Root() user: User,
        @Arg("limit") limit: number,
        @Arg("page") page: number
    ): Promise<UserListingsData> {
        try {
            const repository = getRepository(Listing);
            const data: UserListingsData = {
                total: 0,
                result: []
            };

            const [items, count] = await repository.findAndCount({
                skip: page > 0 ? (page - 1) * limit : 0,
                take: limit,
                where: {
                    host: {
                        id: user.id
                    }
                }
            });

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query user listings: ${error}`);
        }
    }

    @FieldResolver(() => UserBookingsData)
    @UseMiddleware(ValidAntiForgeryToken)
    async bookings(
        @Root() user: User,
        @Arg("limit") limit: number,
        @Arg("page") page: number
    ): Promise<UserBookingsData | null> {
        try {
            if (!user.authorized) {
                return null;
            }

            const repository = getRepository(Booking);
            const data: UserBookingsData = {
                total: 0,
                result: []
            };

            const [items, count] = await repository.findAndCount({
                skip: page > 0 ? (page - 1) * limit : 0,
                take: limit,
                where: {
                    host: {
                        id: user.id
                    }
                }
            });

            data.total = count;
            data.result = items;

            return data;
        } catch (error) {
            throw new Error(`Failed to query user bookings: ${error}`);
        }
    }

    @FieldResolver()
    income(@Root() user: User) {
        return user.authorized ? user.income : null;
    }
}
