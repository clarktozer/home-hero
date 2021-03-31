import { gql } from "@apollo/client";

export const RESEND_CONFIRMATION = gql`
    mutation ResendConfirmation {
        resendConfirmation
    }
`;
