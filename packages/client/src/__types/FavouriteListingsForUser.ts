/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./global";

// ====================================================
// GraphQL query operation: FavouriteListingsForUser
// ====================================================

export interface FavouriteListingsForUser_favouriteListingsForUser_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  guests: number;
  type: ListingType;
}

export interface FavouriteListingsForUser_favouriteListingsForUser {
  __typename: "DataListingResponse";
  total: number;
  result: FavouriteListingsForUser_favouriteListingsForUser_result[];
}

export interface FavouriteListingsForUser {
  favouriteListingsForUser: FavouriteListingsForUser_favouriteListingsForUser | null;
}

export interface FavouriteListingsForUserVariables {
  userId: string;
  page: number;
  limit: number;
}
