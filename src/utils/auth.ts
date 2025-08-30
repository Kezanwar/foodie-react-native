import { IUser } from "types/auth";

export const isAuthSocialMedia = (user: IUser) => user?.auth_method !== "jwt";
