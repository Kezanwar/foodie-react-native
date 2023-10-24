export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  email_confirmed: string;
  auth_method: string;
  avatar: string;
};

export type LoginData = { email: string; password: string };

export type LoginResponse = { user: IUser; accessToken: string };