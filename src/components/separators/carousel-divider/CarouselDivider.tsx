import { View } from "react-native";
import React from "react";
import tw from "theme/tailwind";
import { CAROUSEL_DIVIDER_WIDTH } from "constants/theme";

const CarouselDivider = () => {
  return <View style={{ width: CAROUSEL_DIVIDER_WIDTH }} />;
};
export default CarouselDivider;
