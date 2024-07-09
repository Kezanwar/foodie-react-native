import { useCallback } from "react";
import * as Location from "expo-location";
import useAppDispatch from "./useAppDispatch";
import {
  setIsFindingLocation,
  setLocationError,
  setLocationObject,
} from "store/location/location.slice";
import LocalStorage from "lib/storage";
import useSnackbar from "./useSnackbar";
import { saveUserGeo } from "lib/api";
import { useAppSelector } from "./useAppSelector";
import { getDistanceInMiles } from "utils/distance";

const useRequestLocation = () => {
  const dispatch = useAppDispatch();
  const enqSnack = useSnackbar();
  const user = useAppSelector((state) => state.auth.user);

  const request = useCallback(
    async (showSnackOnErr?: boolean) => {
      try {
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

        dispatch(
          setLocationObject({ location, reverseGeocode: geo[0] || null })
        );

        LocalStorage.setShouldUseCurrentLocation(true);

        if (
          user?.geometry &&
          getDistanceInMiles(user.geometry.coordinates, [
            location.coords.longitude,
            location.coords.latitude,
          ]) < 1
        ) {
          return;
        }

        await saveUserGeo(location.coords.longitude, location.coords.latitude);
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  return request;
};

export default useRequestLocation;
