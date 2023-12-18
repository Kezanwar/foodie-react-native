import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilters } from "types/options";

// types

interface homeSliceState {
  filters: IFilters;
}

const initialState: homeSliceState = {
  filters: { cuisines: [], dietary_requirements: [] },
};

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    addCuisineFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters.cuisines.push(payload);
    },
    removeCuisineFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters.cuisines = state.filters.cuisines.filter(
        (c) => c !== payload
      );
    },
    addDietaryReqFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters.dietary_requirements.push(payload);
    },
    removeDietaryReqFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters.dietary_requirements =
        state.filters.dietary_requirements.filter((c) => c !== payload);
    },
  },
});

// export for use around the app
export const {
  addCuisineFilter,
  addDietaryReqFilter,
  removeCuisineFilter,
  removeDietaryReqFilter,
} = homeSlice.actions;

// export for store
const homeReducer = homeSlice.reducer;

export default homeReducer;
