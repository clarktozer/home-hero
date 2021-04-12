/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookingsForUser
// ====================================================

export interface BookingsForUser_bookingsForUser_result_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  guests: number;
}

export interface BookingsForUser_bookingsForUser_result {
  __typename: "Booking";
  id: string;
  listing: BookingsForUser_bookingsForUser_result_listing;
  checkIn: any;
  checkOut: any;
}

export interface BookingsForUser_bookingsForUser {
  __typename: "DataBookingResponse";
  total: number;
  result: BookingsForUser_bookingsForUser_result[];
}

export interface BookingsForUser {
  bookingsForUser: BookingsForUser_bookingsForUser | null;
}

export interface BookingsForUserVariables {
  userId: string;
  bookingsPage: number;
  limit: number;
}
