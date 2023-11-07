import { LocationGeocodedAddress } from "expo-location";

type ReverseGeocodeMainText = (
  reverseGeocode: LocationGeocodedAddress
) => string;

export const reverseGeocodedMainText: ReverseGeocodeMainText = (
  reverseGeocode
) => {
  if (!reverseGeocode) return "";
  if (reverseGeocode?.district)
    return `${reverseGeocode?.district}, ${reverseGeocode?.city}`;
  else return reverseGeocode?.city || "";
};
