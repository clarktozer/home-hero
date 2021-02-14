import { MaxLength } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../entity";

@InputType()
export class UserInput {
    @Field()
    @MaxLength(5)
    name: string;
}
@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
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
            token: "token_************",
            name: data.name,
            avatar:
                "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
            contact: "james@tinyhouse.com",
            income: 723796
        }).save();

        return user;
    }
}
