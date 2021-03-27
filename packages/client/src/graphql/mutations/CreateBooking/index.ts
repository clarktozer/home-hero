import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
    mutation CreateBooking($input: CreateBookingArgs!) {
        createBooking(input: $input) {
            id
        }
    }
`;
