import MapView, { Marker, Region } from "react-native-maps";
import React, { FC, useRef } from "react";
import { StyleSheet } from "react-native";

type Props = {
  region: Region;
};

const InteractiveMap: FC<Props> = ({ region }) => {
  const mapRef = useRef<MapView>(null);

  const onMapReady = () => {
    mapRef.current?.animateToRegion(region);
  };

  return (
    <MapView
      ref={mapRef}
      showsUserLocation
      maxZoomLevel={18}
      minZoomLevel={10}
      rotateEnabled={false}
      loadingEnabled
      mapType={"standard"}
      region={region}
      initialRegion={region}
      onMapReady={onMapReady}
      style={StyleSheet.absoluteFillObject}
    >
      <Marker identifier="restaurant" coordinate={region} />
    </MapView>
  );
};

export default InteractiveMap;
