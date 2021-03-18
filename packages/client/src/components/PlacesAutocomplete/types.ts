export interface PlacesAutocompleteProps {
    onSearch: (value: string) => void;
    onValidationError?: () => void;
}

export interface PlaceType {
    id: string;
    title: string;
    subtitle: string;
}
