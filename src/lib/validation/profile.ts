import * as Yup from "yup";

export const editProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
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
