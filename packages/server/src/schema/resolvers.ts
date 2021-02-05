import { Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class Resolvers {
    @Query(() => [User])
    async allTypes(): Promise<User[]> {
        return await User.find();
    }
}
