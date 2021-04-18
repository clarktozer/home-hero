import { gql } from "@apollo/client";

export const BOOKINGS_FOR_USER = gql`
    query BookingsForUser($userId: String!, $page: Int!, $limit: Int!) {
        bookingsForUser(userId: $userId, limit: $limit, page: $page) {
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
                    type
                }
                checkIn
                checkOut
            }
        }
    }
`;
