import React, { FC, ReactNode } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import LocationsPermissionsError from "./components/LocationPermissionsError";
import LocationLoading from "./components/LocationLoading";

type Props = {};

const LocationStatus: FC<Props> = () => {
  const { error, isFindingLocation, location } = useAppSelector(
    (state) => state.location
  );

  if (error) return <LocationsPermissionsError error={error} />;

  if (!location && isFindingLocation) return <LocationLoading />;
  else {
    return null;
  }
};

export default LocationStatus;
