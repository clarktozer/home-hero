import { gql } from "@apollo/client";

export const HOST_LISTING = gql`
    mutation HostListing($input: HostListingArgs!) {
        hostListing(input: $input) {
            id
        }
    }
`;
