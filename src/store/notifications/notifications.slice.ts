import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExpoPushToken, Notification } from "expo-notifications";

// types

interface notificationsSliceState {
  expoPushToken?: ExpoPushToken;
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
    setExpoPushToken: (state, { payload }: PayloadAction<ExpoPushToken>) => {
      state.expoPushToken = payload;
    },
  },
});

// export for use around the app
export const { setExpoPushToken, setNotification } = notificationsSlice.actions;

// export for store
const notificationsReducer = notificationsSlice.reducer;

export default notificationsReducer;
