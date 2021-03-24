import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Booking, Listing } from "../../entities";

@ObjectType()
export class UserListingsData {
    @Field(() => Int)
    total: number;

    @Field(() => [Listing])
    result: Listing[];
}

@ObjectType()
export class UserBookingsData {
    @Field(() => Int)
    total: number;

    @Field(() => [Listing])
    result: Booking[];
}

@InputType()
export class UserBookingsArgs {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}
