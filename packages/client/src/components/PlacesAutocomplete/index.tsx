import { useLazyQuery } from "@apollo/client";
import { Grid, Icon, InputBase, Typography } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AUTOCOMPLETE } from "../../graphql";
import { LoadingOption } from "./components";
import { useStyles } from "./style";
import { PlaceType } from "./types";

export const PlacesAutocomplete: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<PlaceType[]>([]);
    const [isOpen, setOpen] = useState(false);

    const [getPlaces, { loading }] = useLazyQuery<any>(AUTOCOMPLETE, {
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

    useEffect(() => {
        if (inputValue === "") {
            setOptions(value ? [value] : []);

            return undefined;
        }

        if (inputValue.length > 2) {
            getPlaces({
                variables: {
                    input: inputValue
                }
            });
        }
    }, [value, inputValue, getPlaces]);

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
                inputProps={params.inputProps}
                placeholder="Search…"
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
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

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
            loading={loading}
            loadingText={<LoadingOption />}
            onOpen={onOpen}
            onClose={onClose}
            open={isOpen && inputValue.length > 2}
        />
    );
};
