import { useLazyQuery } from "@apollo/client";
import {
    CircularProgress,
    Grid,
    Icon,
    InputBase,
    Typography
} from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useBoolean } from "react-use";
import { AUTOCOMPLETE } from "../../graphql";
import {
    Autocomplete as AutocompleteData,
    AutocompleteVariables
} from "../../__types/Autocomplete";
import { useStyles } from "./style";
import { PlaceType } from "./types";

export const PlacesAutocomplete: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<PlaceType[]>([]);
    const [isOpen, setOpen] = useBoolean(false);

    const [getAutocomplete, { loading }] = useLazyQuery<
        AutocompleteData,
        AutocompleteVariables
    >(AUTOCOMPLETE, {
        onCompleted: data => {
            let newOptions: PlaceType[] = [];

            if (value) {
                newOptions = [value];
            }

            if (data.autocomplete) {
                newOptions = [...newOptions, ...data.autocomplete];
            }

            setOptions(newOptions);
        }
    });

    const getAutocompleteRef = useRef(getAutocomplete);

    const debouncedAutocomplete = useMemo(
        () =>
            debounce(
                (input: string) => {
                    getAutocompleteRef.current({
                        variables: {
                            input
                        }
                    });
                },
                300,
                {
                    leading: true
                }
            ),
        []
    );

    useEffect(() => {
        const { pathname } = location;

        if (!pathname.includes("/listings")) {
            onClear();

            return;
        }

        const pathnameSubStrings = pathname.split("/");

        if (pathname.includes("/listings") && pathnameSubStrings.length === 3) {
            const locationSplit = pathnameSubStrings[2].split(",");

            if (locationSplit.length > 0) {
                setInputValue(locationSplit[0]);
            } else {
                setInputValue(pathnameSubStrings[2]);
            }

            return;
        }
    }, [location]);

    useEffect(() => {
        if (inputValue === "") {
            setOptions(value ? [value] : []);

            return undefined;
        }

        if (inputValue.length > 2) {
            debouncedAutocomplete(inputValue);
        }
    }, [value, inputValue, debouncedAutocomplete]);

    const onClear = () => {
        setInputValue("");
        setValue(null);
    };

    const onSearch = (value: string) => {
        history.push(`/listings/${value}`);
    };

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
            setOpen(false);
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
            enqueueSnackbar("Please enter a valid search!", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                }
            });
        }
    };

    const onRenderInput = (params: AutocompleteRenderInputParams) => (
        <div className={classes.search} ref={params.InputProps.ref}>
            <div className={classes.searchIcon}>
                <Icon onClick={onPlaceSearch}>search</Icon>
            </div>
            <InputBase
                inputProps={{
                    ...params.inputProps,
                    value: inputValue
                }}
                placeholder="Search 'Melbourne'"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                onKeyPress={onKeyPress}
            />
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

    const onOpen = () => {
        if (inputValue.length) {
            setOpen(true);
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    const loadingOption = (
        <div className={classes.spinnerContainer}>
            <CircularProgress size={20} />
        </div>
    );

    return (
        <Autocomplete
            className={classes.placesAutocomplete}
            classes={{
                listbox: classes.listBox
            }}
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
            loading={loading}
            loadingText={loadingOption}
            onOpen={onOpen}
            onClose={onClose}
            open={isOpen && inputValue.length > 2}
        />
    );
};
