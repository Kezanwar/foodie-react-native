import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  ISnackbarMessage,
  addMessage,
  removeMessage,
} from "store/slices/snackbar/snackbar.slice";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const enqeueSnackbar = useCallback((message: ISnackbarMessage | string) => {
    dispatch(addMessage(message));
    setTimeout(() => {
      dispatch(
        removeMessage(typeof message === "string" ? message : message.message)
      );
    }, 3000);
  }, []);

  return enqeueSnackbar;
};

export default useSnackbar;
