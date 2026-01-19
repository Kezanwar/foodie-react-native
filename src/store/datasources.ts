import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { onLogout } from "store/global-actions";
import { InitDatasourcePayload } from "types/auth";
import { FavouriteDealItem } from "types/favourites";

// types

type StringBoolStateMap = { [k: string]: boolean };

interface FavouritesSchema {
  deal_favourites: StringBoolStateMap;
  location_follows: StringBoolStateMap;
}

const initialState: FavouritesSchema = {
  deal_favourites: {},
  location_follows: {},
};

export const buildDealFavouriteStateKey = (
  deal_id: string,
  location_id: string,
) => `${deal_id}:${location_id}`;

const datasourcesSlice = createSlice({
  name: "datasourcesSlice",
  initialState,
  reducers: {
    initializeDatasources: (
      state,
      { payload }: PayloadAction<InitDatasourcePayload>,
    ) => {
      const favs: StringBoolStateMap = {};
      for (let x of payload.deal_favourites) {
        favs[buildDealFavouriteStateKey(x.deal_id, x.location_id)] = true;
      }

      state.deal_favourites = favs;

      const foll: StringBoolStateMap = {};
      for (let x of payload.location_follows) {
        foll[x.location_id] = true;
      }

      state.location_follows = foll;

      console.log(state.location_follows);
    },
    addDealFavourite: (
      state,
      { payload }: PayloadAction<FavouriteDealItem>,
    ) => {
      state.deal_favourites[
        buildDealFavouriteStateKey(payload.deal_id, payload.location_id)
      ] = true;
    },
    removeDealFavourite: (
      state,
      { payload }: PayloadAction<FavouriteDealItem>,
    ) => {
      state.deal_favourites[
        buildDealFavouriteStateKey(payload.deal_id, payload.location_id)
      ] = false;
    },
    addLocationFollow: (state, { payload }: PayloadAction<string>) => {
      state.location_follows[payload] = true;
    },
    removeLocationFollow: (state, { payload }: PayloadAction<string>) => {
      state.location_follows[payload] = false;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(onLogout, () => ({
      deal_favourites: {},
      location_follows: {},
    })),
});

// export for use around the app
export const {
  addDealFavourite,
  initializeDatasources,
  removeDealFavourite,
  addLocationFollow,
  removeLocationFollow,
} = datasourcesSlice.actions;

// export for store
const datasourcesReducer = datasourcesSlice.reducer;

export default datasourcesReducer;
