import { gql, useLazyQuery } from "@apollo/client";
import {
    fade,
    Grid,
    Icon,
    InputBase,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import React, { useEffect, useState } from "react";

export const PLACES = gql`
    query Autocomplete($input: String!) {
        autocomplete(input: $input) {
            id
            title
            subtitle
        }
    }
`;

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2)
    },
    title: {
        fontWeight: 400
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(
            theme.palette.type === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
            0.05
        ),
        "&:hover": {
            backgroundColor: fade(
                theme.palette.type === "dark"
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                0.1
            )
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1)
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "30ch"
    }
}));

interface PlaceType {
    id: string;
    title: string;
    subtitle: string;
}

export const PlacesAutocomplete = () => {
    const classes = useStyles();
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<PlaceType[]>([]);
    const [open, setOpen] = useState(true);

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

    const onChange = (
        _event: React.ChangeEvent<{}>,
        newValue: PlaceType | null
    ) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
    };

    const onInputChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setInputValue(newValue);
    };

    const onRenderInput = (params: AutocompleteRenderInputParams) => (
        <div className={classes.search} ref={params.InputProps.ref}>
            <div className={classes.searchIcon}>
                <Icon>search</Icon>
            </div>
            <InputBase
                inputProps={params.inputProps}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
            />
        </div>
    );

    const onRenderTextField = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label="Add a location"
            variant="standard"
            fullWidth
        />
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
            onChange={onChange}
            onInputChange={onInputChange}
            renderInput={onRenderInput}
            renderOption={onRenderOption}
            clearOnBlur={false}
            open={options.length > 0}
        />
    );
};
