import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Query,
    Resolver,
    Root
} from "type-graphql";
import { getRepository } from "typeorm";
import { AppContext } from "../../../middlewares/apollo/types";
import { Listing, User } from "../../entities";
import { UserListingsData } from "./types";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(@Ctx() ctx: AppContext): Promise<User[]> {
        console.log(ctx.req.user);
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
        return user.email === "james@example.com" ? user.income : 100;
    }
}
