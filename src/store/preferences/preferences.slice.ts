import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectChipFormObj } from "types/form";

// types

interface preferencesSliceState {
  isDirty: boolean;
  cuisines: SelectChipFormObj[];
  dietary_requirements: SelectChipFormObj[];
}

const initialState: preferencesSliceState = {
  isDirty: false,
  cuisines: [],
  dietary_requirements: [],
};

const preferencesSlice = createSlice({
  name: "preferencesSlice",
  initialState,
  reducers: {
    initializeCuisines: (
      state,
      { payload }: PayloadAction<SelectChipFormObj[]>
    ) => {
      state.cuisines = payload;
    },
    initializeDietary: (
      state,
      { payload }: PayloadAction<SelectChipFormObj[]>
    ) => {
      state.dietary_requirements = payload;
    },
    toggleCuisine: (state, { payload }: PayloadAction<string>) => {
      const index = state.cuisines.findIndex((el) => el.slug === payload);
      if (index >= 0)
        state.cuisines[index].selected = !state.cuisines[index].selected;
      if (!state.isDirty) {
        state.isDirty = true;
      }
    },
    toggleDietary: (state, { payload }: PayloadAction<string>) => {
      const index = state.dietary_requirements.findIndex(
        (el) => el.slug === payload
      );
      if (index >= 0) {
        state.dietary_requirements[index].selected =
          !state.dietary_requirements[index].selected;
      }
      if (!state.isDirty) {
        state.isDirty = true;
      }
    },
    clearPreferencesIsDirty: (state) => {
      state.isDirty = initialState.isDirty;
    },
    clearPreferences: (state) => {
      state = initialState;
    },
  },
});

// export for use around the app
export const {
  initializeCuisines,
  initializeDietary,
  clearPreferences,
  clearPreferencesIsDirty,
  toggleCuisine,
  toggleDietary,
} = preferencesSlice.actions;

// export for store
const preferencesReducer = preferencesSlice.reducer;

export default preferencesReducer;
