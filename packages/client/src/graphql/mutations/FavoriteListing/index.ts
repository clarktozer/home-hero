import { gql } from "@apollo/client";

export const FAVOURITE_LISTING = gql`
    mutation FavoriteListing($id: String!, $favorite: Boolean!) {
        favoriteListing(id: $id, favorite: $favorite)
    }
`;
