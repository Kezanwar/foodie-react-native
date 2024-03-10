//APP
export const HOME_STACK = {
  ROOT: "HOME_STACK_ROOT",
  SINGLE_DEAL: "HOME_STACK_SINGLE_DEAL",
  SINGLE_RESTAURANT: "HOME_STACK_SINGLE_RESTAURANT",
} as const;

export const ACCOUNT_STACK = {
  ROOT: "ACCOUNT_STACK_ROOT",
  PROFILE: "ACCOUNT_STACK_PROFILE",
} as const;

export const DISCOVER_STACK = {
  ROOT: "DISCOVER_STACK_ROOT",
  SINGLE_DEAL: "DISCOVER_STACK_SINGLE_DEAL",
  SINGLE_RESTAURANT: "DISCOVER_STACK_SINGLE_RESTAURANT",
  CATEGORY: "DISCOVER_STACK_CATEGORY",
} as const;

export type DynamicStack = typeof HOME_STACK | typeof DISCOVER_STACK;

//AUTH
export const AUTH_ROUTES = {
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  ADD_DETAILS: "ADD_DETAILS",
  ADD_EMAIL_PASSWORD: "ADD_EMAIL_PASSWORD",
  CONFIRM_EMAIL: "CONFIRM_EMAIL",
} as const;

export const COMMON_ROUTES = {
  PRIVACY_POLICY: "PRIVACY_POLICY",
  //authenticated
  PREFERENCES: "PREFERENCES",
  LOCATION: "LOCATION",
  ADD_CUSTOM_LOCATION: "ADD_CUSTOM_LOCATION",
  //deal
  SINGLE_DEAL: "SINGLE_DEAL",
  //restaurant
  SINGLE_RESTAURANT: "SINGLE_RESTAURANT",
} as const;
