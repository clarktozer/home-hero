/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Autocomplete
// ====================================================

export interface Autocomplete_autocomplete {
  __typename: "Prediction";
  id: string;
  title: string;
  subtitle: string;
}

export interface Autocomplete {
  autocomplete: Autocomplete_autocomplete[];
}

export interface AutocompleteVariables {
  input: string;
}
