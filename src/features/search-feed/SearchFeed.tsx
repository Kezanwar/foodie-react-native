import { Alert, FlatList, Share } from "react-native";
import React, { FC, useMemo } from "react";

import DealCard from "features/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";

import LoadingState from "components/loading-state";
import { IFeedDeal } from "types/deal-feed";
import { DISCOVER_STACK } from "constants/routes";

import useSearchFeedQuery from "hooks/queries/useSearchFeedQuery";
import { View } from "react-native";
import Typography from "components/typography";
import { useAppSelector } from "hooks/useAppSelector";
import { GetSingleDealProps } from "types/single-deal";
import { setSingleDeal } from "store/single-deal";
import useAppDispatch from "hooks/useAppDispatch";
import useMutateDealFavourites from "hooks/useMutateDealFavourites";

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
    [feedData],
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

  const { favourite, unfavourite } = useMutateDealFavourites();

  const onLike = async (item: IFeedDeal, is_favourited: boolean) => {
    if (!is_favourited) {
      favourite({
        deal_id: item.deal._id,
        location_id: item.location._id,
      });
    } else {
      unfavourite({
        deal_id: item.deal._id,
        location_id: item.location._id,
      });
    }
  };

  const dispatch = useAppDispatch();

  const openDeal = (data: GetSingleDealProps) => {
    dispatch(
      setSingleDeal({
        deal_id: data.deal_id,
        location_id: data.location_id,
        stack: DISCOVER_STACK,
        linkRestaurant: true,
      }),
    );
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
      />
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View style={tw`bg-white px-5 pt-4 gap-1`}>
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
            openDeal={openDeal}
            onShare={onShare}
            item={item}
            onLike={onLike}
          />
        )}
        keyExtractor={(item) => `${item.deal._id}-${item.location._id}`}
        onEndReachedThreshold={1}
      />
    </>
  );
};

export default SearchFeed;
