import { gql } from "@apollo/client";

export const AUTOCOMPLETE = gql`
    query Autocomplete($input: String!) {
        autocomplete(input: $input) {
            id
            title
            subtitle
        }
    }
`;
