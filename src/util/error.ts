import { ErrorObject } from "types/error";

const genericErrMsg = "Something went wrong";

export const fetchErrorHandler = (
  error: unknown,
  onError: (errorObj: ErrorObject) => void
): void => {
  const apiErr = error as ErrorObject;

  console.log(error);
  if (typeof error === "string") {
    onError({ message: error || genericErrMsg, statusCode: 500 });
  } else if (apiErr?.message) {
    console.log("api-error type string");
    onError(apiErr);
  } else {
    console.log("api-error type obj");
    onError({ message: genericErrMsg, statusCode: 500 });
  }
};
