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
import { Stripe } from "../../../api";
import { isAuthorized } from "../../../auth";
import { redis } from "../../../config";
import {
    ANTI_FORGERY_COOKIE,
    CONFIRM_USER_PREFIX,
    SESSION_COOKIE
} from "../../../constants";
import { AppContext } from "../../../middlewares/apollo/types";
import { createConfirmationUrl, sendEmail } from "../../../utils";
import { User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
        if (!ctx.req.user?.id) {
            return undefined;
        }

        const user = await User.findOne(ctx.req.user.id);

        if (!user) {
            throw new Error("User can't be found");
        }

        if (isAuthorized(ctx.req)) {
            user.authorized = true;
        }

        return user;
    }

    @Query(() => User)
    async user(@Ctx() ctx: AppContext, @Arg("id") id: string): Promise<User> {
        try {
            const user = await User.findOne(id);

            if (!user) {
                throw new Error("User can't be found");
            }

            if (isAuthorized(ctx.req) && ctx.req.user?.id === user.id) {
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
                throw new Error("User can't be found");
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

    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string): Promise<boolean> {
        try {
            const key = `${CONFIRM_USER_PREFIX}${token}`;
            const userId = await redis.get(key);

            if (!userId) {
                return false;
            }

            await User.update(
                {
                    id: userId
                },
                {
                    confirmed: true
                }
            );

            await redis.del(key);

            return true;
        } catch (error) {
            throw new Error(`Failed to confirm user: ${error}`);
        }
    }

    @Mutation(() => Boolean)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async resendConfirmation(@Ctx() ctx: AppContext): Promise<boolean> {
        try {
            const user = await User.findOne(ctx.req.user!.id);

            if (!user || user.confirmed) {
                return false;
            }

            const url = await createConfirmationUrl(user.id);
            await sendEmail(user.email, url);

            return true;
        } catch (error) {
            throw new Error(`Failed to resend confirmation email: ${error}`);
        }
    }

    @FieldResolver()
    confirmed(@Root() user: User) {
        return user.authorized ? user.confirmed : null;
    }

    @FieldResolver()
    income(@Root() user: User) {
        return user.authorized ? user.income : null;
    }
}
