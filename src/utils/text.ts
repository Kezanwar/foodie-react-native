import { isAndroid, isIOS } from "constants/theme";
import { LocationGeocodedAddress } from "expo-location";

type ReverseGeocodeMainText = (
  reverseGeocode: LocationGeocodedAddress,
  short?: boolean
) => string;

export const reverseGeocodedMainText: ReverseGeocodeMainText = (
  reverseGeocode,
  short
) => {
  if (!reverseGeocode) return "";

  let value = "";

  if (isIOS) {
    if (short) {
      value = `${reverseGeocode.city}, ${reverseGeocode.subregion}`;
    } else {
      value = `${reverseGeocode.district}, ${reverseGeocode.city}`;
    }
  } else if (isAndroid) {
    if (short) {
      value = reverseGeocode.subregion || "";
    } else {
      value = `${reverseGeocode.street}, ${reverseGeocode.subregion}`;
    }
  }

  return value;
};
