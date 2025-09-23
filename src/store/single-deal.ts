import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DynamicStack } from "constants/routes";
import { onLogout } from "store/global-actions";

export type SingleDealState = {
  deal_id: string;
  location_id: string;
  stack: DynamicStack;
  linkRestaurant: boolean;
};

type State = {
  deal: SingleDealState | undefined;
};

const initialState: State = {
  deal: undefined,
};

const singleDealSlice = createSlice({
  name: "singleDealSlice",
  initialState,
  reducers: {
    setSingleDeal: (
      state,
      { payload }: PayloadAction<SingleDealState | undefined>
    ) => {
      state.deal = payload;
    },
  },
  extraReducers: (builder) => builder.addCase(onLogout, () => initialState),
});

// export for use around the app
export const { setSingleDeal } = singleDealSlice.actions;

// export for store
const singleDealReducer = singleDealSlice.reducer;

export default singleDealReducer;
