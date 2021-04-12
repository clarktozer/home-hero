import { gql } from "@apollo/client";

export const BOOKINGS_FOR_LISTING = gql`
    query BookingsForListing(
        $listingId: String!
        $bookingsPage: Int!
        $limit: Int!
    ) {
        bookingsForListing(
            listingId: $listingId
            limit: $limit
            page: $bookingsPage
        ) {
            total
            result {
                id
                tenant {
                    id
                    name
                    avatar
                }
                checkIn
                checkOut
            }
        }
    }
`;
