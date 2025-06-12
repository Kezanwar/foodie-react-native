import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import tw from "theme/tailwind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

const src = {
  uri: "https://thefoodieappuk.s3.eu-north-1.amazonaws.com/assets/go-to-map.png",
};

const GoToMapImage = (props: Props) => {
  return (
    <View style={tw`p-5 relative`}>
      <Image source={src} style={tw`h-70 w-full rounded-lg`} />
      {/* Overlay */}
      <View
        style={tw`absolute top-5 left-5 w-full h-full bg-grey-800/60 rounded-lg flex items-center justify-center`}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onPress}
          style={tw`bg-grey-800/60 py-2  px-5 rounded-full shadow-md flex-row items-center gap-2`}
        >
          <Text style={tw`text-sm font-bold text-white`}>View Full Map</Text>
          <MaterialIcons name="open-in-new" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoToMapImage;
