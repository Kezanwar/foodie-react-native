import { useCallback } from "react";
import * as Location from "expo-location";
import useAppDispatch from "./useAppDispatch";
import {
  setLocationError,
  setLocationObject,
} from "store/location/location.slice";

const useRequestLocation = () => {
  const dispatch = useAppDispatch();
  const request = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      dispatch(setLocationError("Permission to access location was denied"));
      return;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const geo = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    dispatch(setLocationObject({ location, reverseGeocode: geo[0] || null }));
  }, []);
  return request;
};

export default useRequestLocation;
