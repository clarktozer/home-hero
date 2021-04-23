/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./global";

// ====================================================
// GraphQL query operation: Listing
// ====================================================

export interface Listing_listing_host {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  hasWallet: boolean;
}

export interface Listing_listing {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  image: string;
  host: Listing_listing_host;
  type: ListingType;
  address: string;
  city: string;
  price: number;
  guests: number;
  lat: number;
  lng: number;
  favourited: boolean | null;
  minStay: number;
  maxStay: number;
}

export interface Listing {
  listing: Listing_listing;
}

export interface ListingVariables {
  id: string;
}
