import { Field, Int, ObjectType } from "type-graphql";
import { Listing } from "../../entities";

@ObjectType()
export class UserListingsData {
    @Field(() => Int)
    total: number;

    @Field(() => [Listing])
    result: Listing[];
}
