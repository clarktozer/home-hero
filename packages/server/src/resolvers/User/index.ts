import { MaxLength } from "class-validator";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver
} from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../entity";

interface MyContext {
    [key: string]: any;
}
@InputType()
export class UserInput {
    @Field()
    @MaxLength(5)
    name: string;
}
@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(@Ctx() ctx: MyContext): Promise<User[]> {
        console.log(ctx.req.user);
        return await User.find();
    }

    @Query(() => User)
    async user(@Arg("id") id: string): Promise<User | undefined> {
        return await User.findOne(id);
    }

    @Mutation(() => User)
    async add(@Arg("data") data: UserInput): Promise<User> {
        const user = await User.create({
            id: v4(),
            name: data.name,
            avatar:
                "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
            email: "james@tinyhouse.com",
            income: 723796,
            token: "12345"
        }).save();

        return user;
    }
}
