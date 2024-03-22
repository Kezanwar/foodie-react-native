import { Alert, FlatList, Share } from "react-native";
import React, { FC, useMemo } from "react";

import DealCard from "components/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";

import { Ionicons } from "@expo/vector-icons";
import LoadingState from "components/loading-state";
import { IFeedDeal } from "types/feed";
import { DISCOVER_STACK } from "constants/routes";

import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import { RouteParams } from "screens/common/single-deal/SingleDeal";
import useSearchFeedQuery from "hooks/queries/useSearchFeedQuery";
import { View } from "react-native-ui-lib";
import { Typography } from "components/typography";
import { useAppSelector } from "hooks/useAppSelector";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

type Props = {
  navigation: any;
};

const SearchFeed: FC<Props> = ({ navigation }) => {
  const {
    data: feedData,
    refetch,
    isRefetching,
    isLoading,
  } = useSearchFeedQuery(0);

  const searchText = useAppSelector((state) => state.discover.searchSubmitText);
  const location = useAppSelector((state) => state.location.reverseGeocode);

  const data = useMemo(
    () => feedData?.pages.map((p) => p.deals).flat(1) || [],
    [feedData]
  );

  const onShare = async (title: string) => {
    try {
      const result = await Share.share({
        url: "www.thefoodiestaging.app",
        title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const mutateFav = useMutateFavouriteDeal();

  const onLike = async (item: IFeedDeal) => {
    try {
      mutateFav.mutate({
        deal_id: item.deal.id,
        location_id: item.location.id,
        is_favourited: item.deal.is_favourited,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navToDeal = (data: RouteParams) => {
    data.stack = DISCOVER_STACK;
    navigation.navigate(DISCOVER_STACK.SINGLE_DEAL, data);
  };

  if (isLoading) {
    return <LoadingState text="Searching for deals..." />;
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="No results found"
        description={`Sorry, we couldn't find any results.`}
        action={navigation.goBack}
        actionText={"Error"}
        actionIcon={
          <Ionicons
            name="map-outline"
            size={21}
            color={tw.color("primary-main")}
          />
        }
      />
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={tw`bg-white px-6 pt-4 gap-1`}>
            <Typography variant="body2" color="text.secondary">
              Search results for '{searchText}'
            </Typography>
            <Typography variant="body2" color="text.secondary">
              near {location?.city}, {location?.subregion}
            </Typography>
          </View>
        }
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 `}
        ItemSeparatorComponent={() => <View style={tw`h-3`} />}
        data={data}
        renderItem={({ item }) => (
          <DealCard
            navToDeal={navToDeal}
            onShare={onShare}
            item={item}
            onLike={onLike}
          />
        )}
        keyExtractor={(item) => `${item.deal.id}-${item.location.id}`}
        onEndReachedThreshold={1}
      />
    </>
  );
};

export default SearchFeed;
