import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IColVariants } from "types/colors";

// types

export type ISnackbarMessage = { message: string; variant: IColVariants };

interface snackbarSliceState {
  messages: ISnackbarMessage[];
}

const initialState: snackbarSliceState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: "snackbarSlice",
  initialState,
  reducers: {
    addMessage: (
      state,
      { payload }: PayloadAction<ISnackbarMessage | string>
    ) => {
      if (typeof payload === "string") {
        state.messages.push({ message: payload, variant: "success" });
      } else {
        state.messages.push(payload);
      }
    },
    removeMessage: (state, { payload }: PayloadAction<string>) => {
      state.messages = state.messages.filter((msg) => msg.message !== payload);
    },
  },
});

// export for use around the app
export const { addMessage, removeMessage } = snackbarSlice.actions;

// export for store
const snackbarReducer = snackbarSlice.reducer;

export default snackbarReducer;
