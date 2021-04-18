/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./global";

// ====================================================
// GraphQL query operation: ListingsForUser
// ====================================================

export interface ListingsForUser_listingsForUser_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  guests: number;
  type: ListingType;
}

export interface ListingsForUser_listingsForUser {
  __typename: "DataListingResponse";
  total: number;
  result: ListingsForUser_listingsForUser_result[];
}

export interface ListingsForUser {
  listingsForUser: ListingsForUser_listingsForUser;
}

export interface ListingsForUserVariables {
  userId: string;
  page: number;
  limit: number;
}
