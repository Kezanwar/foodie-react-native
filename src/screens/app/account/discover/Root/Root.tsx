import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import React, { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

import HeaderContainer from "components/header-container";

import { CustomTextField } from "components/form/custom-text-field";
import CuisinesCarousel from "components/cuisines-carousel";
import RestaurantsCarousel from "components/restaurants-carousel";
import Divider from "components/divider";

type Props = {};

const Root: FC<Props> = () => {
  return (
    <>
      <SafeAreaView style={tw`bg-white`}>
        <HeaderContainer style="pb-4">
          <CustomTextField
            actionIcon={
              <AntDesign
                name="search1"
                size={18}
                color={tw.color("primary-main")}
              />
              //   <ActivityIndicator size={18} color={tw.color("primary-main")} />
            }
            actionOnPress={() => {}}
            placeholder="Type to search..."
          />
        </HeaderContainer>
      </SafeAreaView>
      <ScrollView style={tw`flex-1 bg-grey-200`}>
        <View style={tw` bg-white gap-2 p-6 `}>
          <CuisinesCarousel />
          <Divider />
          <RestaurantsCarousel />
          <Divider />
          <RestaurantsCarousel />
        </View>
      </ScrollView>
    </>
  );
};

export default Root;
