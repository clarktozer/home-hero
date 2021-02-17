import { MaxLength } from "class-validator";
import {
    Arg,
    Authorized,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root
} from "type-graphql";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { Listing, User } from "../../entities";

@ObjectType()
class UserListingsData {
    @Field(() => Int)
    total: number;

    @Field(() => [Listing])
    result: Listing[];
}

interface MyContext {
    [key: string]: any;
}
@InputType()
export class UserInput {
    @Field()
    @MaxLength(5)
    name: string;
}
@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(@Ctx() ctx: MyContext): Promise<User[]> {
        console.log(ctx.req.user);
        return await User.find();
    }

    @Query(() => User)
    @Authorized()
    async user(@Arg("id") id: string): Promise<User | undefined> {
        return await User.findOne(id);
    }

    @Mutation(() => User)
    async add(@Arg("data") data: UserInput): Promise<User> {
        const user = await User.create({
            id: v4(),
            name: data.name,
            avatar: "https://placedog.net/72/72?random",
            email: "james@example.com",
            income: 723796,
            token: "12345"
        }).save();

        return user;
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
