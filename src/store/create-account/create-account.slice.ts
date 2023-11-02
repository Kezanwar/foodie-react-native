import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// types

interface createAccountSliceState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const initialState: createAccountSliceState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const createAccountSlice = createSlice({
  name: "createAccountSlice",
  initialState,
  reducers: {
    addRegisterDetails: (
      state,
      { payload }: PayloadAction<{ first_name: string; last_name: string }>
    ) => {
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
    },
    addRegisterEmailPassword: (
      state,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      state.first_name = payload.email;
      state.last_name = payload.password;
    },
  },
});

// export for use around the app
export const { addRegisterDetails, addRegisterEmailPassword } =
  createAccountSlice.actions;

// export for store
const createAccountReducer = createAccountSlice.reducer;

export default createAccountReducer;
