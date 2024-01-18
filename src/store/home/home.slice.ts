import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectChipFormObj } from "types/form";
import { IFilters, Option } from "types/options";

// types

type FilterForm = {
  cuisines: SelectChipFormObj[];
  dietary_requirements: SelectChipFormObj[];
};

interface homeSliceState {
  filters: IFilters;
  filterForm: FilterForm;
  isFilterFormInitialized: boolean;
}

const initialState: homeSliceState = {
  filters: { cuisines: [], dietary_requirements: [] },
  filterForm: {
    cuisines: [],
    dietary_requirements: [],
  },
  isFilterFormInitialized: false,
};

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    initializeFilterForm: (
      state,
      {
        payload,
      }: PayloadAction<{ cuisines: Option[]; dietary_requirements: Option[] }>
    ) => {
      const { cuisines, dietary_requirements } = payload;
      state.filterForm.cuisines = cuisines.map((opt) => ({
        name: opt.name,
        selected: false,
        slug: opt.slug,
      }));
      state.filterForm.dietary_requirements = dietary_requirements.map(
        (opt) => ({
          name: opt.name,
          selected: false,
          slug: opt.slug,
        })
      );
      state.isFilterFormInitialized = true;
    },
    setCuisineFilterForm: (state, { payload }: PayloadAction<number>) => {
      state.filterForm.cuisines[payload].selected =
        !state.filterForm.cuisines[payload].selected;
    },
    setDietaryReqFilterForm: (state, { payload }: PayloadAction<number>) => {
      state.filterForm.dietary_requirements[payload].selected =
        !state.filterForm.dietary_requirements[payload].selected;
    },
    clearCuisinesFilter: (state) => {
      state.filterForm.cuisines = state.filterForm.cuisines.map((item) => ({
        ...item,
        selected: false,
      }));
    },
    clearDietaryFilter: (state) => {
      state.filterForm.dietary_requirements =
        state.filterForm.dietary_requirements.map((item) => ({
          ...item,
          selected: false,
        }));
    },
    onSaveFilterForm: (state) => {
      state.filters.cuisines = state.filterForm.cuisines.reduce(
        (acc, curr): string[] => {
          if (curr.selected) {
            acc.push(curr.slug);
          }
          return acc;
        },
        [] as string[]
      );
      state.filters.dietary_requirements =
        state.filterForm.dietary_requirements.reduce((acc, curr): string[] => {
          if (curr.selected) {
            acc.push(curr.slug);
          }
          return acc;
        }, [] as string[]);
    },
  },
});

// export for use around the app
export const {
  setCuisineFilterForm,
  setDietaryReqFilterForm,
  initializeFilterForm,
  onSaveFilterForm,
  clearCuisinesFilter,
  clearDietaryFilter,
} = homeSlice.actions;

// export for store
const homeReducer = homeSlice.reducer;

export default homeReducer;
