import * as yup from 'yup';


export const schema = yup.object().shape({
    userName: yup
        .string()
        .required("User name is required.")
        .min(2, "User name must be between 2 and 50 characters.")
        .max(50, "User name must be between 2 and 50 characters.")
        .matches(
            /^[a-zA-Z\s-]+$/,
            "User name can only contain Latin letters, spaces, and hyphens."
        )
        .test(
            "not-only-spaces",
            "User name cannot consist of spaces only.",
            (value) => value && value.trim() !== ""
        ),
    userLastname: yup
        .string()
        .required("User last name is required.")
        .min(2, "User last name must be between 2 and 50 characters.")
        .max(50, "User last name must be between 2 and 50 characters.")
        .matches(
            /^[a-zA-Z\s-]+$/,
            "User last name can only contain Latin letters, spaces, and hyphens."
        )
        .test(
            "not-only-spaces",
            "User last name cannot consist of spaces only.",
            (value) => value && value.trim() !== ""
        ),
    userJobTitle: yup
        .string()
        .max(100, "Job title must be at most 100 characters.")
        .matches(
            /^[a-zA-Z0-9\s]*$/,
            "Job title can only contain letters, digits, and spaces."
        ),
    userPhone: yup
        .string()
        .required("Phone number is required.")
        .min(10, "Phone number must be between 10 and 15 characters.")
        .max(15, "Phone number must be between 10 and 15 characters.")
        .matches(
            /^\+\d{9,14}$/,
            "Phone number must start with + and contain only numbers."
        ),
    userAddress: yup
        .string()
        .max(200, "Address must be at most 200 characters.")
        .matches(
            /^[a-zA-Z0-9\s.,]*$/,
            "Address can only contain letters, digits, spaces, dots, and commas."
        ),
    userInterests: yup
        .string()
        .max(30, "Interests must be less than 30 characters.")
        .matches(
            /^[a-zA-Z0-9 ,.\-]+$/,
            "Interests can only contain letters, digits, spaces, commas, dots, and hyphens."
        ),
    userPotentialInterests: yup
        .string()
        .max(30, "Interests must be less than 30 characters.")
        .matches(
            /^[a-zA-Z0-9 ,.\-]+$/,
            "Interests can only contain letters, digits, spaces, commas, dots, and hyphens."
        ),
    userLink: yup
        .string()
        .url("Must be a valid URL.")
        .matches(
            /^(http:\/\/|https:\/\/)/,
            "URL must start with http:// or https://."
        )
        .max(200, "URL must be less than 200 characters."),
    userPich: yup
        .string()
        .max(200, "Pitch must be at most 200 characters.")
        .matches(
            /^[a-zA-Z0-9\s.,]*$/,
            "Pitch can only contain letters, digits, spaces, dots, and commas."
        ),
});


export const formFields = {
    userName: {
        general: "Name",
        type: "text",
        label: "Name",
    },
    userLastname: {
        general: "Lastname",
        type: "text",
        label: "Last Name",
    },
    userJobTitle: {
        general: "Job Title",
        type: "text",
        label: "Job Title",
    },
    userPhone: {
        general: "Phone",
        type: "phone",
        label: "Phone Number",
    },
    userAddress: {
        general: "Address",
        type: "text",
        label: "Address",
    },
    userPich: {
        general: "Pitch",
        type: "text",
        label: "Pitch",
    },
};