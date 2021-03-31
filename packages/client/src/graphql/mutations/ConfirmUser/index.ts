import { gql } from "@apollo/client";

export const CONFIRM_USER = gql`
    mutation ConfirmUser($token: String!) {
        confirmUser(token: $token)
    }
`;
