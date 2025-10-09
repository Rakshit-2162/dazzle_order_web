import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const searchSchema = yup.object().shape({
  search: yup.string().required("Type something here...!"),
});

export const createPurchaseOrderSchema = yup.object({
  distributor_id: yup.string().required("Distributor is required"),
  remarks: yup.string().required("Remark is required"),
});

export const createDistributorSchema = yup.object({
  distributor_id: yup
    .string()
    .length(5, "ID must be of 5 digits")
    .required("Distributor ID is required"),
  user_name: yup.string().required("Distributor Name is required"),
  user_mobile: yup
    .string()
    .length(10, "Mobile must be of 10 digits")
    .required(),
  user_password: yup.string().required("Password is required"),
  user_company_name: yup.string().required("Company name is required"),
  city_state: yup.string().required("Location is required"),
});
