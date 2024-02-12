import * as Yup from "yup";

//* LOGIN
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[@$!%*#?&]+/, "Password must have special character")
    .matches(/\d+/, "Password must have one number")
    .matches(/[a-z]+/, "Password must have one lowercase character")
    .matches(/[A-Z]+/, "Password must have uppercase character"),
});

//* REGISTER
export const RegisterUserDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
});

export const RegisterEmailPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[@$!%*#?&]+/, "Password must have special character")
    .matches(/\d+/, "Password must have one number")
    .matches(/[a-z]+/, "Password must have one lowercase character")
    .matches(/[A-Z]+/, "Password must have uppercase character"),
  confirm_password: Yup.string()
    .required("Must confirm your Password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
});
