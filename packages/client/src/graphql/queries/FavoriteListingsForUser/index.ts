import { gql } from "@apollo/client";

export const FAVOURITE_LISTINGS_FOR_USER = gql`
    query FavouriteListingsForUser(
        $userId: String!
        $listingsPage: Int!
        $limit: Int!
    ) {
        favouriteListingsForUser(
            userId: $userId
            limit: $limit
            page: $listingsPage
        ) {
            total
            result {
                id
                title
                image
                address
                price
                guests
                type
            }
        }
    }
`;
