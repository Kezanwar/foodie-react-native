import { View } from "react-native";
import React from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import LottieView from "lottie-react-native";

const LocationLoading = () => {
  return (
    <View style={tw`px-6 py-6 flex-1 items-center justify-center bg-white`}>
      <LottieView
        source={require("../../../../assets/lottie/foodie-loading.json")}
        autoPlay
        style={tw`h-40 mb-[-10] mt-[-30] w-50`}
        loop
        speed={1.4}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        style="text-center w-50"
      >
        Verifying your location, this may take a second...
      </Typography>
    </View>
  );
};

export default LocationLoading;
