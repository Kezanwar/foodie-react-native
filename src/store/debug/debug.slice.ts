import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { onLogout } from "store/global-actions";

interface debugSliceState {
  devMode: boolean;
}

const initialState: debugSliceState = {
  devMode: true,
};

const debugSlice = createSlice({
  name: "debugSlice",
  initialState,
  reducers: {
    setDevMode: (state, { payload }: PayloadAction<boolean>) => {
      state.devMode = payload;
    },
  },
  extraReducers: (builder) => builder.addCase(onLogout, () => initialState),
});

// export for use around the app
export const { setDevMode } = debugSlice.actions;

// export for store
const debugReducer = debugSlice.reducer;

export default debugReducer;
