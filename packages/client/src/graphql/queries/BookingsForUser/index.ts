import { gql } from "@apollo/client";

export const BOOKINGS_FOR_USER = gql`
    query BookingsForUser($userId: String!, $bookingsPage: Int!, $limit: Int!) {
        bookingsForUser(userId: $userId, limit: $limit, page: $bookingsPage) {
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
    }
`;
