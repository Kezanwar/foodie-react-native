import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  ISnackbarMessage,
  addMessage,
  removeMessage,
} from "store/snackbar/snackbar.slice";
import { v4 } from "uuid";

const useSnackbar = () => {
  const dispatch = useDispatch();

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
