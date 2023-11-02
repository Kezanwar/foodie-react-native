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
    console.log("api-error type string");
    onError(apiErr);
    return;
  } else {
    console.log("api-error type obj");
    onError({ message: genericErrMsg, statusCode: 500 });
  }
};
