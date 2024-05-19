import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExpoPushToken, Notification } from "expo-notifications";

// types

interface notificationsSliceState {
  expoPushToken?: string;
  notification?: Notification;
}

const initialState: notificationsSliceState = {
  expoPushToken: undefined,
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
    setExpoPushToken: (state, { payload }: PayloadAction<ExpoPushToken>) => {
      state.expoPushToken = payload.data;
    },
  },
});

// export for use around the app
export const { setExpoPushToken, setNotification, clearNotification } =
  notificationsSlice.actions;

// export for store
const notificationsReducer = notificationsSlice.reducer;

export default notificationsReducer;
