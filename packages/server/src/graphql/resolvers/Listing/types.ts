import { MaxLength } from "class-validator";
import {
    Field,
    InputType,
    Int,
    ObjectType,
    registerEnumType
} from "type-graphql";
import { Booking, Listing } from "../../entities";
import { ListingType } from "../../entities/Listing/types";
import { DataResponse, PagingationArgs } from "../types";

export enum ListingsFilter {
    PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
    PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW"
}

registerEnumType(ListingsFilter, {
    name: "ListingsFilter"
});

export interface ListingsQuery {
    country?: string;
    admin?: string;
    city?: string;
}

@InputType()
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

@InputType()
export class ListingsArgs extends PagingationArgs {
    @Field(() => String, { nullable: true })
    location: string | null;

    @Field(() => ListingsFilter)
    filter: ListingsFilter;
}

@ObjectType()
export class ListingsData extends DataResponse(Listing) {
    @Field(() => String, { nullable: true })
    region: string | null;
}

@ObjectType()
export class ListingBookingsData {
    @Field(() => Int)
    total: number;

    @Field(() => [Booking])
    result: Booking[];
}

@InputType()
export class ListingBookingsArgs {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}

@InputType()
export class UserListingsArgs {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}
