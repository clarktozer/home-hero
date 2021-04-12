import { gql } from "@apollo/client";

export const LISTINGS_FOR_USER = gql`
    query ListingsForUser($userId: String!, $listingsPage: Int!, $limit: Int!) {
        listingsForUser(userId: $userId, limit: $limit, page: $listingsPage) {
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
