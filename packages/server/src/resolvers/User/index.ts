import { Query, Resolver } from "type-graphql";
import { User } from "../../entity";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async allTypes(): Promise<User[]> {
        return await User.find();
    }
}
