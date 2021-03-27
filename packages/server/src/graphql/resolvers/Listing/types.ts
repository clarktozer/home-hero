import { MaxLength } from "class-validator";
import {
    ArgsType,
    Field,
    InputType,
    Int,
    ObjectType,
    registerEnumType
} from "type-graphql";
import { ListingType } from "../../entities/Listing/types";
import { ListingDataResponse, PaginationArgs } from "../types";

export enum ListingsFilter {
    TITLE_ASC = "TITLE_ASC",
    TITLE_DESC = "TITLE_DESC",
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

    @Field(() => Int)
    maxStay: number;

    @Field(() => Int)
    minStay: number;

    @Field()
    recaptcha: string;
}

@ArgsType()
export class ListingsArgs extends PaginationArgs {
    @Field(() => String, { nullable: true })
    location: string | null;

    @Field(() => ListingsFilter)
    filter: ListingsFilter;
}

@ObjectType()
export class ListingsData extends ListingDataResponse {
    @Field(() => String, { nullable: true })
    region: string | null;
}

export interface GoogleRecaptchaResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    error_codes?: string[];
}
