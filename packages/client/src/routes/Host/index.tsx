import {
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import classnames from "classnames";
import { useFormik } from "formik";
import React, { FC, useEffect } from "react";
import { useStyles } from "./style";
import { FormProps } from "./types";
import { validationSchema } from "./validation";

export const Host: FC = () => {
    const classes = useStyles();
    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        isSubmitting,
        isValidating
    } = useFormik<FormProps>({
        initialValues: {
            type: "",
            numOfGuests: undefined,
            title: "",
            description: "",
            address: "",
            city: "",
            state: "",
            postCode: "",
            price: undefined
        },
        validationSchema,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        }
    });

    useEffect(() => {
        if (isSubmitting && !isValidating && errors) {
            const keys = Object.keys(errors);

            if (keys.length > 0) {
                const selector = `[name=${keys[0]}]`;
                const errorElement = document.querySelector<HTMLElement>(
                    selector
                );

                if (errorElement) {
                    errorElement.focus();
                }
            }
        }
    }, [errors, isSubmitting, isValidating]);

    const onHomeTypeChange = (
        _event: React.MouseEvent<HTMLElement, MouseEvent>,
        value: string
    ) => {
        setFieldValue("type", value);
    };

    return (
        <Container className={classes.hostContainer}>
            <form className={classes.root} noValidate onSubmit={handleSubmit}>
                <div className={classes.hostHeader}>
                    <Typography variant="h5" gutterBottom>
                        Hi! Let's get started listing your place.
                    </Typography>
                    <Typography variant="body2">
                        In this form, we'll collect some basic and additional
                        information about your listing.
                    </Typography>
                </div>
                <FormControl
                    className={classes.fieldSet}
                    component="fieldset"
                    name="type"
                    tabIndex={-1}
                    error={touched.type && Boolean(errors.type)}
                >
                    <FormLabel
                        className={classes.formLabel}
                        required
                        focused={false}
                    >
                        Home Type
                    </FormLabel>
                    <ToggleButtonGroup
                        value={values.type}
                        exclusive
                        onChange={onHomeTypeChange}
                        className={classnames({
                            [classes.toggleGroupError]:
                                touched.type && Boolean(errors.type)
                        })}
                    >
                        <ToggleButton
                            className={classes.toggleButton}
                            value="APARTMENT"
                        >
                            <Icon>apartment</Icon>
                            <span className={classes.toggleButtonLabel}>
                                Apartment
                            </span>
                        </ToggleButton>
                        <ToggleButton
                            className={classes.toggleButton}
                            value="HOUSE"
                        >
                            <Icon>house</Icon>
                            <span className={classes.toggleButtonLabel}>
                                House
                            </span>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <FormHelperText>
                        {touched.type && errors.type}
                    </FormHelperText>
                </FormControl>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="numOfGuests"
                    name="numOfGuests"
                    label="Max # of Guests"
                    type="number"
                    value={values.numOfGuests}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                    error={touched.numOfGuests && Boolean(errors.numOfGuests)}
                    helperText={touched.numOfGuests && errors.numOfGuests}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="title"
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={
                        <>
                            {touched.title && errors.title}
                            <span className={classes.helperText}>
                                Max character count of 45
                            </span>
                        </>
                    }
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="description"
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={
                        <>
                            {touched.description && errors.description}
                            <span className={classes.helperText}>
                                Max character count of 400
                            </span>
                        </>
                    }
                    multiline
                    rows={2}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="address"
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="city"
                    name="city"
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="state"
                    name="state"
                    label="State"
                    value={values.state}
                    onChange={handleChange}
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="postCode"
                    name="postCode"
                    label="Post Code"
                    value={values.postCode}
                    onChange={handleChange}
                    error={touched.postCode && Boolean(errors.postCode)}
                    helperText={touched.postCode && errors.postCode}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                    error={touched.price && Boolean(errors.price)}
                    helperText={
                        <>
                            {touched.price && errors.price}
                            <span className={classes.helperText}>
                                All prices in $USD/day
                            </span>
                        </>
                    }
                />
                <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};
