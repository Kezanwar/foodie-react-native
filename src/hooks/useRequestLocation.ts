import { useCallback } from "react";
import * as Location from "expo-location";
import useAppDispatch from "./useAppDispatch";
import {
  setLocationError,
  setLocationObject,
} from "store/location/location.slice";
import { setShouldUseCurrentLocation } from "lib/storage/storage";
import useSnackbar from "./useSnackbar";

const useRequestLocation = () => {
  const dispatch = useAppDispatch();
  const enqSnack = useSnackbar();
  const request = useCallback(async (showSnackOnErr?: boolean) => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      dispatch(setLocationError("Permission to access location was denied"));
      if (showSnackOnErr)
        enqSnack({
          message: "You must update Location Permissions for Foodie first.",
          variant: "error",
        });
      return;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const geo = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    dispatch(setLocationObject({ location, reverseGeocode: geo[0] || null }));
    setShouldUseCurrentLocation(true);
  }, []);
  return request;
};

export default useRequestLocation;
