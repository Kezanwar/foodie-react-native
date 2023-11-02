import { Logo } from "components/logo";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import tw from "theme/tailwind";

const LoadingScreen: React.FC = () => {
  return (
    <View
      style={tw`absolute h-screen w-screen top-0 items-center justify-center `}
    >
      <LottieView
        source={require("../../../assets/lottie/foodie-loading.json")}
        autoPlay
        style={tw`h-60 mb-[-30] w-60`}
        loop
        speed={1.4}
      />
      <Logo width={200} height={50} />
    </View>
  );
};

export default LoadingScreen;
