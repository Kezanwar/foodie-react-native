import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import React, { FC, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

import HeaderContainer from "components/header-container";

import { CustomTextField } from "components/form/custom-text-field";

import useDiscoverQuery from "hooks/queries/useDiscoverQuery";
import { LoadingScreen } from "components/loading-screen";
import DiscoverRestaurants from "features/discover-restaurants";
import DiscoverCuisines from "features/discover-cuisines";

type Props = {};

const Root: FC<Props> = () => {
  const { data, isLoading } = useDiscoverQuery();

  const onCuisinePress = useCallback(() => {}, []);

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
      <ScrollView style={tw` bg-grey-200`} contentContainerStyle={tw`gap-3`}>
        <View style={tw`bg-white p-6`}>
          <DiscoverRestaurants restaurants={data?.data.restaurants} />
        </View>

        <View style={tw`bg-white p-6`}>
          <DiscoverCuisines
            onCuisinePress={onCuisinePress}
            cuisines={data?.data.cuisines}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Root;
