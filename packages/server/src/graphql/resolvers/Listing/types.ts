import { MaxLength } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";
import { ListingType } from "../../entities/Listing/types";

@ArgsType()
export class HostListingArgs {
    @Field()
    @MaxLength(45)
    title: string;

    @Field()
    @MaxLength(400)
    description: string;

    @Field()
    image: string;

    @Field(() => ListingType)
    type: ListingType;

    @Field()
    address: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int)
    guests: number;
}
