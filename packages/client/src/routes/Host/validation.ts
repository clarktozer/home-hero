import * as yup from "yup";

export const validationSchema = yup.object({
    type: yup.string().required("Please select a home type!"),
    guests: yup.number().required("Please enter the max number of guests!"),
    maxStay: yup
        .number()
        .required("Please enter the max number of days guests can stay!"),
    minStay: yup
        .number()
        .required("Please enter the min number of days guests can stay!"),
    title: yup
        .string()
        .required("Please enter a title for your listing!")
        .max(45, "Please enter a title that is a maximum of 45 characters."),
    description: yup
        .string()
        .required("Please enter a description for your listing!")
        .max(
            400,
            "Please enter a description that is a maximum of 400 characters."
        ),
    address: yup.string().required("Please enter an address for your listing!"),
    city: yup
        .string()
        .required("Please enter a city (or region) for your listing!"),
    state: yup.string().required("Please enter a state for your listing!"),
    postCode: yup
        .string()
        .required("Please enter a post code for your listing!"),
    price: yup.number().required("Please enter a price for your listing!"),
    recaptcha: yup.string().required(),
    image: yup.string().required("Please add an image for your listing!")
});
