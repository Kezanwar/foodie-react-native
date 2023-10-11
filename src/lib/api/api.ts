import axiosInstance from "lib/axios/axios";
import { iOptions } from "types/options";

const endpoints = {
  // options
  getOptions: "/options",
};

// *OPTIONS

export const getOptions = () => {
  return axiosInstance.get<iOptions>(endpoints.getOptions);
};
