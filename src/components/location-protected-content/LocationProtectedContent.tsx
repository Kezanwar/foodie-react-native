import React, { FC, ReactNode } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import LocationsPermissionsError from "./components/LocationPermissionsError";
import LocationLoading from "./components/LocationLoading";

type Props = {
  children: ReactNode;
};

const LocationProtectedContent: FC<Props> = ({ children }) => {
  const { error, isFindingLocation, location } = useAppSelector(
    (state) => state.location
  );

  if (!location && isFindingLocation) return <LocationLoading />;

  if (error) return <LocationsPermissionsError error={error} />;
  else {
    return children;
  }
};

export default LocationProtectedContent;
