import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DARK, LIGHT } from "constants/theme";

interface themeSliceState {
  theme: "light" | "dark";
}

const initialState: themeSliceState = {
  theme: LIGHT,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<"light" | "dark">) => {
      state.theme = payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === DARK ? LIGHT : DARK;
    },
  },
});

// export for use around the app
export const { setTheme, toggleTheme } = themeSlice.actions;

// export for store
const themeReducer = themeSlice.reducer;

export default themeReducer;
