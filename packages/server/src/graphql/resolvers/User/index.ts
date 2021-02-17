import { MaxLength } from "class-validator";
import {
    Arg,
    Authorized,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    Query,
    Resolver,
    Root
} from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../entities";

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

    @FieldResolver()
    income(@Root() user: User) {
        return user.email === "james@example.com" ? user.income : 100;
    }
}
