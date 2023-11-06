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
    let loc = await Location.getCurrentPositionAsync();
    dispatch(setLocationObject(loc));
  }, []);
  return request;
};

export default useRequestLocation;
