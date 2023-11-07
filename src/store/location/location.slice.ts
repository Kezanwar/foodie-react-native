import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocationGeocodedAddress, LocationObject } from "expo-location";

// types

interface locationSliceState {
  location: LocationObject | null;
  reverseGeocode: LocationGeocodedAddress | null;
  error: string | null;
}

const initialState: locationSliceState = {
  location: null,
  reverseGeocode: null,
  error: null,
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setLocationObject: (
      state,
      {
        payload,
      }: PayloadAction<{
        location: LocationObject;
        reverseGeocode: LocationGeocodedAddress;
      }>
    ) => {
      state.location = payload.location;
      state.reverseGeocode = payload.reverseGeocode;
    },
    setLocationError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    clearlocationObject: (state) => {
      state.location = initialState.location;
      state.reverseGeocode = initialState.reverseGeocode;
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
