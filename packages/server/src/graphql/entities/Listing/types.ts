import { registerEnumType } from "type-graphql";

export enum ListingType {
    APARTMENT = "APARTMENT",
    HOUSE = "HOUSE"
}

registerEnumType(ListingType, {
    name: "ListingType"
});
