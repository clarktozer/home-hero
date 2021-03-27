import { gql } from "@apollo/client";

export const USER = gql`
    query User(
        $id: String!
        $bookingsPage: Int!
        $listingsPage: Int!
        $limit: Int!
    ) {
        user(id: $id) {
            id
            name
            avatar
            email
            hasWallet
            income
            bookings(limit: $limit, page: $bookingsPage) {
                total
                result {
                    id
                    listing {
                        id
                        title
                        image
                        address
                        price
                        guests
                    }
                    checkIn
                    checkOut
                }
            }
            listings(limit: $limit, page: $listingsPage) {
                total
                result {
                    id
                    title
                    image
                    address
                    price
                    guests
                }
            }
        }
    }
`;
