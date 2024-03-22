import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ls from "lib/storage/storage";
import { Keyboard } from "react-native";

// types

interface DiscoverSliceState {
  searchInputText: string;
  searchSubmitText: string;
  isSearchFocused: boolean;
  searchHistory: string[];
}

const initialState: DiscoverSliceState = {
  searchInputText: "",
  searchSubmitText: "",
  isSearchFocused: false,
  searchHistory: ls.getSearchHistory(),
};

const discoverSlice = createSlice({
  name: "discoverSlice",
  initialState,
  reducers: {
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchInputText = payload;
      if (!state.isSearchFocused) state.isSearchFocused = true;
    },
    onClearSearchText: (state) => {
      state.searchInputText = "";
      state.searchSubmitText = "";
    },
    handleSuggestionSearch: (state, { payload }: PayloadAction<string>) => {
      const newHistory = [...state.searchHistory].filter((s) => s !== payload);
      newHistory.unshift(payload);
      const final = newHistory.slice(0, 5).filter(Boolean);

      ls.setSearchHistory(final);
      state.searchHistory = final;
      state.searchInputText = payload;
      state.searchSubmitText = payload;
      state.isSearchFocused = false;
      Keyboard.dismiss();
    },
    handleSubmitSearch: (state) => {
      if (state.searchInputText) {
        const newHistory = [...state.searchHistory].filter(
          (s) => s !== state.searchInputText
        );
        newHistory.unshift(state.searchInputText);
        const final = newHistory.slice(0, 5).filter(Boolean);

        ls.setSearchHistory(final);
        state.searchHistory = final;
        state.searchSubmitText = state.searchInputText;
        state.isSearchFocused = false;
      }
    },
    setIsSearchFocusedOn: (state) => {
      state.isSearchFocused = true;
    },
    setIsSearchFocusedOff: (state) => {
      state.isSearchFocused = false;
    },
  },
});

// export for use around the app
export const {
  setSearchText,
  setIsSearchFocusedOn,
  setIsSearchFocusedOff,
  handleSubmitSearch,
  handleSuggestionSearch,
  onClearSearchText,
} = discoverSlice.actions;

// export for store
const discoverReducer = discoverSlice.reducer;

export default discoverReducer;
