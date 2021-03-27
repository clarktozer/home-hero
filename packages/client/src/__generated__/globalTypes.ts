/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingType {
  Apartment = "Apartment",
  House = "House",
}

export enum ListingsFilter {
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  TITLE_ASC = "TITLE_ASC",
  TITLE_DESC = "TITLE_DESC",
}

export interface CreateBookingArgs {
  id: string;
  source: string;
  checkIn: string;
  checkOut: string;
}

export interface HostListingArgs {
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  price: number;
  guests: number;
  maxStay: number;
  minStay: number;
  recaptcha: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
