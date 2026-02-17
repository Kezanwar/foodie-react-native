import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import React, { FC, useCallback } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

import HeaderContainer from "components/header-container";
import { CustomTextField } from "components/form/custom-text-field";
import { LoadingScreen } from "components/loading-screen";
import DiscoverRestaurants from "features/discover-restaurants";
import DiscoverCuisines from "features/discover-cuisines";

import useDiscoverQuery from "hooks/queries/useDiscoverQuery";
import NewsCarousel from "features/news-carousel";
import { COMMON_ROUTES, DISCOVER_STACK } from "constants/routes";
import { Option } from "types/options";
import SearchSuggestions from "components/search-suggestions";

import useAppDispatch from "hooks/useAppDispatch";
import {
  handleSubmitSearch,
  onClearSearchText,
  setIsSearchFocusedOff,
  setIsSearchFocusedOn,
  setSearchText,
} from "store/discover";
import { useAppSelector } from "hooks/useAppSelector";

import useSearchFeedQuery from "hooks/queries/useSearchFeedQuery";
import SearchFeed from "features/search-feed/SearchFeed";
import SectionCard from "components/section-card/SectionCard";
import LocationStatus from "components/location-protected-content/LocationProtectedContent";
import Feather from "@expo/vector-icons/Feather";
import LoadingSpinner from "components/loading-spinner";
import EmptyState from "components/empty-state/EmptyState";
import LocationProtectedContent from "components/location-protected-content/LocationProtectedContent";

type Props = any;

const PRIM = tw.color("primary-main");

const Root: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleUpdateSearch = (s: string) => {
    dispatch(setSearchText(s));
  };

  const { isSearchFocused, searchInputText, searchSubmitText } = useAppSelector(
    (state) => state.discover,
  );

  const { location, error: locationError } = useAppSelector(
    (state) => state.location,
  );

  const hasLocation = !locationError && location;

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
      stack: DISCOVER_STACK,
    });

  const handleLocationPress = () => navigation.navigate(COMMON_ROUTES.LOCATION);

  return (
    <>
      <SafeAreaView style={tw`bg-white z-10`}>
        <HeaderContainer style="pb-4 relative">
          <View style={tw`flex-row items-center gap-2`}>
            <CustomTextField
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={handleOnSearchSubmit}
              value={searchInputText}
              containerStyle={tw`flex-1`}
              inputMode="search"
              actionIcon={
                <AntDesign
                  name="close-circle"
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
              placeholder="Search Deals"
            />
            {searchFeedIsLoading ? (
              <LoadingSpinner />
            ) : (
              <TouchableOpacity onPress={handleOnSearchSubmit}>
                <Feather name="search" size={23} color={PRIM} />
              </TouchableOpacity>
            )}
          </View>
          {isSearchFocused && <SearchSuggestions />}
        </HeaderContainer>
      </SafeAreaView>
      <LocationProtectedContent>
        {!hasSubmitted || searchFeedIsLoading ? (
          <DiscoverBaseContent
            navToLocation={handleLocationPress}
            navToRest={navRest}
            onCuisinePress={onCuisinePress}
          />
        ) : (
          <SearchFeed navigation={navigation} />
        )}
      </LocationProtectedContent>
    </>
  );
};

type DiscoverBaseContentProps = {
  navToRest: (location_id: string) => void;
  onCuisinePress: (option: Option) => void;
  navToLocation: () => void;
};

const DiscoverBaseContent: FC<DiscoverBaseContentProps> = ({
  navToRest,
  navToLocation,
  onCuisinePress,
}) => {
  const { data, isLoading } = useDiscoverQuery();

  const location = useAppSelector((state) => state.location.reverseGeocode);

  if (isLoading) return <LoadingScreen />;

  const cuisines = data?.data?.cuisines;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`bg-grey-200 relative`}
      contentContainerStyle={tw`gap-3 z-0 `}
    >
      {!cuisines?.length ? (
        <SectionCard>
          <EmptyState
            title="No Results"
            description={`near ${location?.city}, ${location?.subregion}`}
            action={navToLocation}
            actionText="Change location"
            actionIcon={
              <Ionicons
                name="map-outline"
                size={19}
                color={tw.color("primary-main")}
              />
            }
          />
        </SectionCard>
      ) : (
        <>
          <SectionCard>
            <DiscoverRestaurants
              navToRest={navToRest}
              restaurants={data?.data?.restaurants}
            />
          </SectionCard>
          <SectionCard>
            <DiscoverCuisines
              onCuisinePress={onCuisinePress}
              cuisines={data?.data?.cuisines}
            />
          </SectionCard>
        </>
      )}

      {data?.data?.blogs && (
        <SectionCard>
          <NewsCarousel blogs={data?.data?.blogs} />
        </SectionCard>
      )}
    </ScrollView>
  );
};

export default Root;
