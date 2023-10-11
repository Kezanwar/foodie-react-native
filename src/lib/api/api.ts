import axiosInstance from "lib/axios/axios";
import { IOptions } from "types/options";

const endpoints = {
  // options
  getOptions: "/options",
};

// *OPTIONS

export const getOptions = () => {
  return axiosInstance.get<IOptions>(endpoints.getOptions);
};
