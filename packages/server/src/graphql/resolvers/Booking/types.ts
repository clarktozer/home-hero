import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBookingArgs {
    @Field()
    id: string;

    @Field()
    source: string;

    @Field()
    checkIn: string;

    @Field()
    checkOut: string;
}
