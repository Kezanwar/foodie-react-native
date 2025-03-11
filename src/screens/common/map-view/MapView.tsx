import BackButton from "components/buttons/back-button";
import { InteractiveMap } from "components/map";
import React from "react";
import { Region } from "react-native-maps";

type RouteParams = {
  region: MapViewRegion;
};

export type MapViewRegion = { latitude: number; longitude: number };

const MapView = ({ route, navigation }: any) => {
  const { region } = route.params as RouteParams;

  return (
    <>
      <InteractiveMap region={region as Region} />
      <BackButton onPress={navigation.goBack} isAbsolute />
    </>
  );
};

export default MapView;
