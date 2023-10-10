import { createSlice } from "@reduxjs/toolkit";

// types

interface authSliceState {
  count: number;
}

const initialState: authSliceState = {
  count: 0,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
});

// export for use around the app
export const { increment } = authSlice.actions;

// export for store
const authReducer = authSlice.reducer;

export default authReducer;
