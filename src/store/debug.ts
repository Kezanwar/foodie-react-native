import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { differenceInSeconds } from "date-fns";
import axiosInstance from "lib/axios";
import { baseUrl, localBaseURL } from "lib/env";
import { onLogout } from "store/global-actions";

const SECRET_TAP_COUNT = 20;

interface debugSliceState {
  active: boolean;
  secretTaps: number;
  secretTapsLastUpdate: string;
  debugAPIEndpoint: string;
}

const initialState: debugSliceState = {
  active: false,
  secretTaps: 0,
  secretTapsLastUpdate: new Date().toISOString(),
  debugAPIEndpoint: localBaseURL,
};

const debugSlice = createSlice({
  name: "debugSlice",
  initialState,
  reducers: {
    deactivate: (state) => {
      axiosInstance.defaults.baseURL = baseUrl;
      state.active = false;
      state.secretTaps = 0;
      state.debugAPIEndpoint = localBaseURL;
    },
    handleSecretTap: (state) => {
      if (state.active) {
        return;
      }
      const now = new Date();
      if (differenceInSeconds(new Date(state.secretTapsLastUpdate), now) < 4) {
        if (state.secretTaps === SECRET_TAP_COUNT - 1) {
          state.active = true;
          axiosInstance.defaults.baseURL = state.debugAPIEndpoint;
        } else {
          state.secretTaps = state.secretTaps + 1;
        }
      } else {
        state.secretTaps = state.secretTaps = 1;
      }
      state.secretTapsLastUpdate = now.toISOString();
    },
    setDebugAPIEndpoint: (state, { payload }: PayloadAction<string>) => {
      state.debugAPIEndpoint = payload;
      axiosInstance.defaults.baseURL = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(onLogout, () => {
      axiosInstance.defaults.baseURL = baseUrl;
      return initialState;
    }),
});

// export for use around the app
export const { deactivate, handleSecretTap, setDebugAPIEndpoint } =
  debugSlice.actions;

// export for store
const debugReducer = debugSlice.reducer;

export default debugReducer;
