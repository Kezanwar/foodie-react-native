import MapView, { Marker, Region } from "react-native-maps";
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
    });
  };
  return (
    <MapView
      onMapReady={fitToElements}
      ref={mapRef}
      showsUserLocation
      maxZoomLevel={18}
      minZoomLevel={10}
      rotateEnabled={false}
      loadingEnabled
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
