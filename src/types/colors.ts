import { COLOR_MAP } from "theme/colors";
import { Path } from "./obj";

export type IColorMap = Path<typeof COLOR_MAP>;

type IPrimary =
  | "primary-main"
  | "primary-light"
  | "primary-lighter"
  | "primary-dark"
  | "primary-darker"
  | "primary-contrast";

type ISecondary =
  | "secondary-main"
  | "secondary-light"
  | "secondary-lighter"
  | "secondary-dark"
  | "secondary-darker"
  | "secondary-contrast";

type ISuccess =
  | "success-main"
  | "success-light"
  | "success-lighter"
  | "success-dark"
  | "success-darker"
  | "success-contrast";

type IInfo =
  | "info-main"
  | "info-light"
  | "info-lighter"
  | "info-dark"
  | "info-darker"
  | "info-contrast";

type IWarning =
  | "warning-main"
  | "warning-light"
  | "warning-lighter"
  | "warning-dark"
  | "warning-darker"
  | "warning-contrast";

type IError =
  | "error-main"
  | "error-light"
  | "error-lighter"
  | "error-dark"
  | "error-darker"
  | "error-contrast";

type IGrey =
  | "grey-100"
  | "grey-200"
  | "grey-300"
  | "grey-400"
  | "grey-500"
  | "grey-600"
  | "grey-700"
  | "grey-800"
  | "grey-950";

export type ITwColor =
  | IPrimary
  | ISecondary
  | ISuccess
  | IInfo
  | IGrey
  | IError;
