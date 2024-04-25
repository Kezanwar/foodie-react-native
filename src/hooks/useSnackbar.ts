import { useCallback } from "react";
import {
  ISnackbarMessage,
  addMessage,
  removeMessage,
} from "store/snackbar/snackbar.slice";
import { v4 } from "uuid";
import useAppDispatch from "./useAppDispatch";

const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const enqeueSnackbar = useCallback((message: ISnackbarMessage) => {
    const uuid = v4();
    message.id = uuid;
    dispatch(addMessage(message));
    setTimeout(() => {
      dispatch(removeMessage(uuid));
    }, 3000);
  }, []);

  return enqeueSnackbar;
};

export default useSnackbar;
