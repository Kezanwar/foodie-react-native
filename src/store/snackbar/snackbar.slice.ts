import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IColVariants } from "types/colors";

export type ISnackbarMessage = {
  message: string;
  variant: IColVariants;
  id?: string;
};

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
    addMessage: (state, { payload }: PayloadAction<ISnackbarMessage>) => {
      state.messages.push(payload);
    },
    removeMessage: (state, { payload }: PayloadAction<string>) => {
      state.messages = state.messages.filter((msg) => msg.id !== payload);
    },
  },
});

// export for use around the app
export const { addMessage, removeMessage } = snackbarSlice.actions;

// export for store
const snackbarReducer = snackbarSlice.reducer;

export default snackbarReducer;
