import axiosInstance from "lib/axios/axios";
import { LoginData, LoginResponse } from "types/auth";
import { IOptions } from "types/options";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  loginWithGoogle: "/auth/login-google",
  register: "/auth/register",
  registerWithGoogle: "/auth/register-google",
  intialize: "/auth/initialize",
};

const APP_ENDPOINTS = {
  // options
  getOptions: "/options",
};

// *OPTIONS

export const getOptions = () => {
  return axiosInstance.get<IOptions>(APP_ENDPOINTS.getOptions);
};

//*AUTH

export const loginJWT = (data: LoginData) => {
  return axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.login, data);
};
