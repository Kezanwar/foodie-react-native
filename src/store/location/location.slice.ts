import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import LocalStorage from "lib/storage";

// types

interface locationSliceState {
  location: LocationObject | null;
  reverseGeocode: LocationGeocodedAddress | null;
  error: string | null;
  isFindingLocation: boolean;
}

export type LocationLocalStorageData =
  | {
      location: LocationObject;
      reverseGeocode: LocationGeocodedAddress;
    }
  | undefined;

const initialLocalStorage = LocalStorage.getLastKnownLocation();

const initialState: locationSliceState = {
  location: initialLocalStorage?.location || null,
  reverseGeocode: initialLocalStorage?.reverseGeocode || null,
  error: null,
  isFindingLocation: false,
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
      state.isFindingLocation = false;
      state.error = null;
      LocalStorage.setlastKnownLocation({
        location: payload.location,
        reverseGeocode: payload.reverseGeocode,
      });
    },
    setLocationError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.location = null;
      state.reverseGeocode = null;
      state.isFindingLocation = false;
      LocalStorage.clearLastKnownLocation();
    },
    setIsFindingLocation: (state) => {
      state.isFindingLocation = true;
    },
    clearlocationError: (state) => {
      state.error = initialState.error;
    },
  },
});

// export for use around the app
export const { setLocationObject, setLocationError, setIsFindingLocation } =
  locationSlice.actions;

// export for store
const locationReducer = locationSlice.reducer;

export default locationReducer;
