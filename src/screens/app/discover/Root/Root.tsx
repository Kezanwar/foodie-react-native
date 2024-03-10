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
import { LoadingScreen } from "components/loading-screen";
import DiscoverRestaurants from "features/discover-restaurants";
import DiscoverCuisines from "features/discover-cuisines";

import useDiscoverQuery from "hooks/queries/useDiscoverQuery";
import NewsCarousel from "features/news-carousel";
import { DISCOVER_STACK } from "constants/routes";
import { Option } from "types/options";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  const { data, isLoading } = useDiscoverQuery();

  const onCuisinePress = useCallback((option: Option) => {
    navigation.navigate(DISCOVER_STACK.CATEGORY, option);
  }, []);

  const navRest = (location_id: string) =>
    navigation.navigate(DISCOVER_STACK.SINGLE_RESTAURANT, {
      location_id,
      show_cover_photo: true,
      stack: DISCOVER_STACK,
    });

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
          <DiscoverRestaurants
            navToRest={navRest}
            restaurants={data?.data.restaurants}
          />
        </View>
        <View style={tw`bg-white p-6`}>
          <DiscoverCuisines
            onCuisinePress={onCuisinePress}
            cuisines={data?.data.cuisines}
          />
        </View>
        <View style={tw`bg-white p-6`}>
          <NewsCarousel blogs={data?.data.blogs} />
        </View>
      </ScrollView>
    </>
  );
};

export default Root;
