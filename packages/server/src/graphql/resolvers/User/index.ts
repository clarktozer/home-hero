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
import { ANTI_FORGERY_COOKIE, SESSION_COOKIE } from "../../../constants";
import { AppContext } from "../../../middlewares/apollo/types";
import { Listing, User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { UserListingsData } from "./types";

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
        if (ctx.req.user) {
            return User.findOne(ctx.req.user.id);
        } else {
            return undefined;
        }
    }

    @Mutation(() => User)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async updateUser(@Ctx() ctx: AppContext): Promise<User | null> {
        try {
            const user = await User.findOne(ctx.req.user!.id);

            if (!user) {
                return null;
            }

            user.income = 1;

            await user.save();

            return user;
        } catch (error) {
            throw new Error("Unable to find user");
        }
    }

    @Mutation(() => Boolean)
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

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await User.find();
    }

    @Query(() => User)
    @Authorized()
    async user(@Arg("id") id: string): Promise<User | undefined> {
        return await User.findOne(id);
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

    @FieldResolver()
    income(@Root() user: User) {
        return user.income;
    }
}
