import * as yup from "yup";

export const validationSchema = yup.object({
    type: yup.string().required("Please select a home type!"),
    numOfGuests: yup
        .number()
        .required("Please enter the max number of guests!"),
    title: yup.string().required("Please enter a title for your listing!"),
    description: yup
        .string()
        .required("Please enter a description for your listing!"),
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
