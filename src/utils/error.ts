import { ErrorObject } from "types/error";

const genericErrMsg = "Something went wrong";

export const catchErrorHandler = (
  error: unknown,
  onError: (errorObj: ErrorObject) => void
): void => {
  console.log(error);
  if (typeof error === "string") {
    onError({ message: error || genericErrMsg, statusCode: 500 });
    return;
  }
  const apiErr = error as ErrorObject;
  if (apiErr?.message) {
    onError(apiErr);
    return;
  } else {
    onError({ message: genericErrMsg, statusCode: 500 });
  }
};
