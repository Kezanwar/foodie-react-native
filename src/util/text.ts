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
  if (reverseGeocode?.district)
    if (short) return `${reverseGeocode?.city}, ${reverseGeocode?.subregion}`;
    else return `${reverseGeocode?.district}, ${reverseGeocode?.city}`;
  else return reverseGeocode?.city || "";
};
