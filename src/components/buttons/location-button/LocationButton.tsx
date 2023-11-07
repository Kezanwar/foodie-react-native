import { TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const LocationButton: FC<Props> = () => {
  const { reverseGeocode } = useAppSelector((state) => state.location);
  return (
    <TouchableOpacity style={tw`flex-row gap-2 items-center`}>
      <Ionicons
        name="ios-map-outline"
        size={20}
        color={tw.color("primary-main")}
      />
      <View>
        <Typography variant="body2" style=" text-[3]" color="text.primary">
          {reverseGeocode ? `${reverseGeocode?.district}` : "No Location"}
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
