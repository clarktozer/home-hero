import { useMutation } from "@apollo/client";
import {
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    InputAdornment,
    Link,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import classnames from "classnames";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { FC } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { CenterSpinner } from "../../components";
import { HOST_LISTING } from "../../graphql";
import { useFocusError } from "../../hooks";
import { getViewer } from "../../state/features";
import { HostListingArgs, ListingType } from "../../__types/global";
import {
    HostListing as HostListingData,
    HostListingVariables
} from "../../__types/HostListing";
import { FilePicker } from "./components";
import { useStyles } from "./style";
import { HostListingFormValues } from "./types";
import { validationSchema } from "./validation";

export const Host: FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const viewer = useSelector(getViewer);
    const { enqueueSnackbar } = useSnackbar();

    const [hostListing, { loading, data }] = useMutation<
        HostListingData,
        HostListingVariables
    >(HOST_LISTING, {
        onCompleted: () => {
            enqueueSnackbar("You've successfully created your listing!", {
                variant: "success"
            });
        },
        onError: () => {
            enqueueSnackbar(
                "Sorry! We weren't able to create your listing. Please try again later.",
                {
                    variant: "error"
                }
            );
        }
    });

    const onSubmit = (values: HostListingFormValues) => {
        const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.postCode}`;

        const input: HostListingArgs = {
            description: values.description,
            image: values.image,
            maxStay: values.maxStay,
            minStay: values.minStay,
            recaptcha: values.recaptcha,
            title: values.title,
            type: values.type!,
            guests: values.guests!,
            address: fullAddress,
            price: values.price ? values.price * 100 : 0
        };

        hostListing({
            variables: {
                input
            }
        });
    };

    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        isSubmitting,
        isValidating
    } = useFormik<HostListingFormValues>({
        initialValues: {
            type: undefined,
            guests: undefined,
            title: "",
            description: "",
            address: "",
            city: "",
            state: "",
            postCode: "",
            price: undefined,
            recaptcha: "",
            image: "",
            maxStay: 90,
            minStay: 2
        },
        validationSchema,
        onSubmit
    });

    useFocusError(errors, isSubmitting, isValidating);

    const onHomeTypeChange = (
        _event: React.MouseEvent<HTMLElement, MouseEvent>,
        value: string
    ) => {
        setFieldValue("type", value);
    };

    const onRecaptchaChange = (token: string | null) => {
        setFieldValue("recaptcha", token);
    };

    const onImageChange = async (image: string) => {
        setFieldValue("image", image);
    };

    if (
        process.env.NODE_ENV === "production" &&
        (!viewer || !viewer.id || !viewer.hasWallet)
    ) {
        return (
            <Container className={classes.emptyHostContainer}>
                <div className={classes.hostHeader}>
                    <Typography variant="h5" gutterBottom>
                        You'll have to be signed in and connected with Stripe to
                        host a listing!
                    </Typography>
                    <Typography variant="body2">
                        We only allow users who've signed in to our application
                        and have connected with Stripe to host new listings. You
                        can sign in at the{" "}
                        <Link
                            color="secondary"
                            component={RouterLink}
                            to="/login"
                        >
                            login
                        </Link>{" "}
                        page and connect with Stripe shortly after.
                    </Typography>
                </div>
            </Container>
        );
    }

    if (loading) {
        return <CenterSpinner />;
    }

    if (data && data.hostListing) {
        return <Redirect to={`/listing/${data.hostListing.id}`} />;
    }

    return (
        <div className={classes.hostContainer}>
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
                    error={touched.type && Boolean(errors.type)}
                    tabIndex={-1}
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
                            value={ListingType.APARTMENT}
                        >
                            <Icon>apartment</Icon>
                            <span className={classes.toggleButtonLabel}>
                                Apartment
                            </span>
                        </ToggleButton>
                        <ToggleButton
                            className={classes.toggleButton}
                            value={ListingType.HOUSE}
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
                    id="guests"
                    name="guests"
                    label="Max # of Guests"
                    type="number"
                    value={values.guests || ""}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                    error={touched.guests && Boolean(errors.guests)}
                    helperText={touched.guests && errors.guests}
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="minStay"
                    name="minStay"
                    label="Min length of stay"
                    type="number"
                    value={values.minStay || ""}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                Nights
                            </InputAdornment>
                        )
                    }}
                    error={touched.minStay && Boolean(errors.minStay)}
                    helperText={touched.minStay && errors.maxStay}
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
                />
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="maxStay"
                    name="maxStay"
                    label="Max length of stay"
                    type="number"
                    value={values.maxStay || ""}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        },
                        endAdornment: (
                            <InputAdornment position="end">Days</InputAdornment>
                        )
                    }}
                    error={touched.maxStay && Boolean(errors.maxStay)}
                    helperText={touched.maxStay && errors.maxStay}
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
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
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    inputProps={{ maxLength: 45 }}
                    tabIndex={-1}
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
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    inputProps={{ maxLength: 400 }}
                    tabIndex={-1}
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
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
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
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
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
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
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
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
                />
                <FormControl
                    className={classes.fieldSet}
                    name="image"
                    component="fieldset"
                    error={touched.image && Boolean(errors.image)}
                    tabIndex={-1}
                >
                    <FormLabel
                        className={classes.formLabel}
                        required
                        focused={false}
                    >
                        Image
                    </FormLabel>
                    <FilePicker
                        value={values.image}
                        onChange={onImageChange}
                        error={touched.image && Boolean(errors.image)}
                    />
                    <FormHelperText>
                        {touched.image && errors.image}
                        <span className={classes.helperText}>
                            Images have to be under 1MB in size and of type JPG
                            or PNG
                        </span>
                    </FormHelperText>
                </FormControl>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price || ""}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: {
                            min: 1
                        },
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        )
                    }}
                    error={touched.price && Boolean(errors.price)}
                    helperText={
                        <>
                            {touched.price && errors.price}
                            <span className={classes.helperText}>
                                All prices in $AUD/day
                            </span>
                        </>
                    }
                    FormHelperTextProps={{
                        variant: "standard"
                    }}
                    tabIndex={-1}
                />
                <FormControl
                    name="recaptcha"
                    component="fieldset"
                    fullWidth
                    error={touched.recaptcha && Boolean(errors.recaptcha)}
                    tabIndex={-1}
                >
                    <div
                        className={classnames({
                            [classes.recaptchaError]:
                                touched.recaptcha && Boolean(errors.recaptcha)
                        })}
                    >
                        <ReCAPTCHA
                            key={theme.palette.type}
                            sitekey={`${process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}`}
                            onChange={onRecaptchaChange}
                            theme={theme.palette.type}
                        />
                    </div>
                </FormControl>
                <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
