/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookingsForListing
// ====================================================

export interface BookingsForListing_bookingsForListing_result_tenant {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
}

export interface BookingsForListing_bookingsForListing_result {
  __typename: "Booking";
  id: string;
  tenant: BookingsForListing_bookingsForListing_result_tenant;
  checkIn: any;
  checkOut: any;
}

export interface BookingsForListing_bookingsForListing {
  __typename: "DataBookingResponse";
  total: number;
  result: BookingsForListing_bookingsForListing_result[];
}

export interface BookingsForListing {
  bookingsForListing: BookingsForListing_bookingsForListing | null;
}

export interface BookingsForListingVariables {
  listingId: string;
  page: number;
  limit: number;
}
