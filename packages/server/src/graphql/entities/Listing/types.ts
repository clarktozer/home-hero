import { registerEnumType } from "type-graphql";

export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE"
}

registerEnumType(ListingType, {
    name: "ListingType"
});
