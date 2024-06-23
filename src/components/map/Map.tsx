import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import React, { FC, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  mapStyle: StyleProp<ViewStyle>;
  region: Region;
};

const Map: FC<Props> = ({ mapStyle, region }) => {
  const mapRef = useRef<MapView>(null);

  const fitToElements = () => {
    mapRef?.current?.fitToElements({
      animated: true,
      edgePadding: {
        top: 300,
        right: 0,
        left: 500,
        bottom: 0,
      },
    });
  };
  return (
    <MapView
      onMapReady={fitToElements}
      ref={mapRef}
      showsUserLocation
      maxZoomLevel={12}
      minZoomLevel={8}
      loadingEnabled
      provider={PROVIDER_GOOGLE}
      mapType="standard"
      region={region}
      initialRegion={region}
      style={mapStyle}
    >
      <Marker identifier="restaurant" coordinate={region} />
    </MapView>
  );
};

export default Map;
