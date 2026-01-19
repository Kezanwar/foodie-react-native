import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExpoPushToken, Notification } from "expo-notifications";
import { onLogout } from "store/global-actions";

// types

interface notificationsSliceState {
  notification?: Notification;
}

const initialState: notificationsSliceState = {
  notification: undefined,
};

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.notification = payload;
    },
    clearNotification: (state) => {
      state.notification = undefined;
    },
  },
  extraReducers: (builder) => builder.addCase(onLogout, () => initialState),
});

// export for use around the app
export const { setNotification, clearNotification } =
  notificationsSlice.actions;

// export for store
const notificationsReducer = notificationsSlice.reducer;

export default notificationsReducer;
