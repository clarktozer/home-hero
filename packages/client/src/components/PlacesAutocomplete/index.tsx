import { useLazyQuery } from "@apollo/client";
import {
    CircularProgress,
    Grid,
    Icon,
    InputBase,
    Typography
} from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import React, { FC, useEffect, useState } from "react";
import { PLACES } from "../../graphql";
import { useStyles } from "./style";
import { PlacesAutocompleteProps, PlaceType } from "./types";

export const PlacesAutocomplete: FC<PlacesAutocompleteProps> = ({
    onSearch,
    onValidationError
}) => {
    const classes = useStyles();
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<PlaceType[]>([]);

    const [getPlaces, { loading, data }] = useLazyQuery<any>(PLACES, {
        onCompleted: data => {
            console.log(data);

            setOptions(data.autocomplete);
        }
    });

    useEffect(() => {
        if (inputValue === "") {
            setOptions(value ? [value] : []);

            return undefined;
        }

        getPlaces({
            variables: {
                input: inputValue
            }
        });
    }, [value, inputValue, getPlaces]);

    const onGetOptionLabel = (option: PlaceType) => option.title;

    const onValueChange = (
        _event: React.ChangeEvent<{}>,
        newValue: PlaceType | null
    ) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        if (newValue) {
            onSearch(`${newValue.title}, ${newValue.subtitle}`);
        }
    };

    const onInputChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setInputValue(newValue);
    };

    const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = event => {
        if (event.key === "Enter") {
            onPlaceSearch();
            event.preventDefault();
        }
    };

    const onPlaceSearch = () => {
        let trimmedValue = inputValue.trim();

        if (value) {
            trimmedValue = `${value.title}, ${value.subtitle}`;
        }

        if (trimmedValue) {
            onSearch(trimmedValue);
        } else {
            onValidationError && onValidationError();
        }
    };

    const onRenderInput = (params: AutocompleteRenderInputParams) => (
        <div className={classes.search} ref={params.InputProps.ref}>
            <div className={classes.searchIcon}>
                <Icon onClick={onPlaceSearch}>search</Icon>
            </div>
            <InputBase
                inputProps={params.inputProps}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                onKeyPress={onKeyPress}
            />
            {loading && <CircularProgress />}
        </div>
    );

    const onGetOptionSelected = (option: PlaceType, newValue: PlaceType) =>
        option.id === newValue.id;

    const onRenderOption = (option: PlaceType) => (
        <Grid container alignItems="center">
            <Grid item>
                <Icon className={classes.icon}>location_on</Icon>
            </Grid>
            <Grid item xs>
                <span className={classes.title}>{option.title}</span>
                <Typography variant="body2" color="textSecondary">
                    {option.subtitle}
                </Typography>
            </Grid>
        </Grid>
    );

    return (
        <Autocomplete
            options={options}
            getOptionLabel={onGetOptionLabel}
            getOptionSelected={onGetOptionSelected}
            autoComplete
            filterSelectedOptions
            value={value}
            onChange={onValueChange}
            onInputChange={onInputChange}
            renderInput={onRenderInput}
            renderOption={onRenderOption}
            clearOnBlur={false}
        />
    );
};
