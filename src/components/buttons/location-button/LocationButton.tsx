import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { FC } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { Typography } from "components/typography";
import tw from "theme/tailwind";

import { Ionicons } from "@expo/vector-icons";
import { reverseGeocodedMainText } from "util/text";

type Props = TouchableOpacityProps;

const LocationButton: FC<Props> = ({ onPress }) => {
  const { reverseGeocode } = useAppSelector((state) => state.location);

  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row gap-2 items-center`}>
      <Ionicons
        name="ios-map-outline"
        size={21}
        color={tw.color("primary-main")}
      />
      <View>
        <Typography variant="body2" style=" text-[3.25]" color="text.primary">
          {reverseGeocode
            ? reverseGeocodedMainText(reverseGeocode, true)
            : "No Location"}
        </Typography>
        {/* <Typography
          variant="body2"
          style=" text-[3.5] leading-[1.3]"
          color="text.primary"
        >
          {reverseGeocode ? `${reverseGeocode?.city}` : "Location"}
        </Typography> */}
      </View>
    </TouchableOpacity>
  );
};

export default LocationButton;
