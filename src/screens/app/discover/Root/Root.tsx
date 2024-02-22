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

import RestaurantsCarousel from "components/restaurants-carousel";
import useDiscoverQuery from "hooks/queries/useDiscoverQuery";
import { LoadingScreen } from "components/loading-screen";

type Props = {};

const Root: FC<Props> = () => {
  const { data, isLoading } = useDiscoverQuery();

  console.log(data?.data);

  if (isLoading) return <LoadingScreen />;

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
        <View style={tw` bg-white  p-6 `}>
          <RestaurantsCarousel />
        </View>
      </ScrollView>
    </>
  );
};

export default Root;
