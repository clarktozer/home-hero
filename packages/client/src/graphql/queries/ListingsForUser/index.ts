import { gql } from "@apollo/client";

export const LISTINGS_FOR_USER = gql`
    query ListingsForUser($userId: String!, $page: Int!, $limit: Int!) {
        listingsForUser(userId: $userId, limit: $limit, page: $page) {
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
