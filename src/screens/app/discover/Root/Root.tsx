import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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
import SearchSuggestions from "components/search-suggestions";
import { DiscoverResponse } from "types/discover";
import useAppDispatch from "hooks/useAppDispatch";
import {
  handleSubmitSearch,
  onClearSearchText,
  setIsSearchFocusedOff,
  setIsSearchFocusedOn,
  setSearchText,
} from "store/discover/discover.slice";
import { useAppSelector } from "hooks/useAppSelector";

import useSearchFeedQuery from "hooks/queries/useSearchFeedQuery";
import SearchFeed from "features/search-feed/SearchFeed";

type Props = any;

const PRIM = tw.color("primary-main");

const Root: FC<Props> = ({ navigation }) => {
  const { data, isLoading } = useDiscoverQuery();

  const dispatch = useAppDispatch();

  const handleUpdateSearch = (s: string) => {
    dispatch(setSearchText(s));
  };

  const { isSearchFocused, searchInputText, searchSubmitText } = useAppSelector(
    (state) => state.discover
  );

  const hasSubmitted = !!searchSubmitText;

  const { isLoading: searchFeedIsLoading } = useSearchFeedQuery(0);

  const handleSetSearchFocusedOn = () => dispatch(setIsSearchFocusedOn());

  const handleClearText = () => dispatch(onClearSearchText());

  const handleSetSearchFocusedOff = () => dispatch(setIsSearchFocusedOff());

  const handleOnSearchSubmit = () => dispatch(handleSubmitSearch());

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
      <SafeAreaView style={tw`bg-white z-10`}>
        <HeaderContainer style="pb-4 relative">
          <View style={tw`flex-row items-center gap-2`}>
            <CustomTextField
              value={searchInputText}
              containerStyle={tw`flex-1`}
              actionIcon={
                <AntDesign
                  name="closecircleo"
                  size={18}
                  color={tw.color("grey-600")}
                />
              }
              actionOnPress={
                searchInputText?.length ? handleClearText : undefined
              }
              onFocus={handleSetSearchFocusedOn}
              onBlur={handleSetSearchFocusedOff}
              onChangeText={handleUpdateSearch}
              placeholder="Type to search..."
            />
            {searchFeedIsLoading ? (
              <ActivityIndicator size={"small"} color={PRIM} />
            ) : (
              <TouchableOpacity onPress={handleOnSearchSubmit}>
                <AntDesign name="search1" size={23} color={PRIM} />
              </TouchableOpacity>
            )}
          </View>
          {isSearchFocused && <SearchSuggestions />}
        </HeaderContainer>
      </SafeAreaView>

      {(!hasSubmitted || searchFeedIsLoading) && data?.data ? (
        <DiscoverBaseContent
          navToRest={navRest}
          onCuisinePress={onCuisinePress}
          data={data?.data}
        />
      ) : (
        <SearchFeed navigation={navigation} />
      )}
    </>
  );
};

type DiscoverBaseContentProps = {
  data: DiscoverResponse;
  navToRest: (location_id: string) => void;
  onCuisinePress: (option: Option) => void;
};

const DiscoverBaseContent: FC<DiscoverBaseContentProps> = ({
  data,
  navToRest,
  onCuisinePress,
}) => {
  return (
    <ScrollView
      style={tw`bg-grey-200 relative`}
      contentContainerStyle={tw`gap-3 z-0 `}
    >
      <View style={tw`bg-white p-6`}>
        <DiscoverRestaurants
          navToRest={navToRest}
          restaurants={data?.restaurants}
        />
      </View>
      <View style={tw`bg-white p-6`}>
        <DiscoverCuisines
          onCuisinePress={onCuisinePress}
          cuisines={data?.cuisines}
        />
      </View>
      <View style={tw`bg-white p-6`}>
        <NewsCarousel blogs={data?.blogs} />
      </View>
    </ScrollView>
  );
};

export default Root;
