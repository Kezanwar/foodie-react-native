import { useCallback } from "react";
import * as Location from "expo-location";
import useAppDispatch from "./useAppDispatch";
import {
  setIsFindingLocation,
  setLocationError,
  setLocationObject,
} from "store/location/location.slice";
import ls from "lib/storage/storage";
import useSnackbar from "./useSnackbar";

const useRequestLocation = () => {
  const dispatch = useAppDispatch();
  const enqSnack = useSnackbar();

  const request = useCallback(async (showSnackOnErr?: boolean) => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      dispatch(setLocationError("Location Permission was denied"));

      if (showSnackOnErr)
        enqSnack({
          message: "You must update Location Permissions for Foodie first.",
          variant: "error",
        });

      return;
    }

    dispatch(setIsFindingLocation());

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      mayShowUserSettingsDialog: true,
    });
    const geo = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    dispatch(setLocationObject({ location, reverseGeocode: geo[0] || null }));
    ls.setShouldUseCurrentLocation(true);
  }, []);
  return request;
};

export default useRequestLocation;
