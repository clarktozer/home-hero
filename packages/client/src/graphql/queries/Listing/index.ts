import { gql } from "@apollo/client";

export const LISTING = gql`
    query Listing($id: String!) {
        listing(id: $id) {
            id
            title
            description
            image
            host {
                id
                name
                avatar
                hasWallet
            }
            type
            address
            city
            admin
            country
            price
            guests
            lat
            lng
            favourited
            minStay
            maxStay
        }
    }
`;
