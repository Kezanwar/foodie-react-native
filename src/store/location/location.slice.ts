import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocationObject, LocationObjectCoords } from "expo-location";

// types

interface locationSliceState {
  location: LocationObject | null;
  error: string | null;
}

const initialState: locationSliceState = {
  location: null,
  error: null,
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setLocationObject: (state, { payload }: PayloadAction<LocationObject>) => {
      state.location = payload;
    },
    setLocationError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    clearlocationObject: (state) => {
      state.location = initialState.location;
    },
    clearlocationError: (state) => {
      state.error = initialState.error;
    },
  },
});

// export for use around the app
export const { setLocationObject, setLocationError, clearlocationObject } =
  locationSlice.actions;

// export for store
const locationReducer = locationSlice.reducer;

export default locationReducer;
