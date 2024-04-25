import { Alert, FlatList, ScrollView, Share } from "react-native";
import React, { forwardRef, useMemo } from "react";
import useHomeFeedQuery from "hooks/queries/useHomeFeedQuery";
import DealCard from "components/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";
import { useAppSelector } from "hooks/useAppSelector";
import FilterIcon from "components/svgs/filter-icon";
import { Ionicons } from "@expo/vector-icons";
import LoadingState from "components/loading-state";
import { IFeedDeal } from "types/feed";
import { HOME_STACK } from "constants/routes";

import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import { GetSingleDealProps } from "types/single-deal";

import { setSingleDeal } from "store/single-deal/single-deal.slice";
import useAppDispatch from "hooks/useAppDispatch";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

export type HomeFeedRef = ScrollView;

type Props = {
  openFilters: () => void;
  navToLocation: () => void;
  navigation: any;
};

const HomeFeed = forwardRef<HomeFeedRef, Props>(
  ({ openFilters, navToLocation }, ref) => {
    const {
      data: feedData,
      fetchNextPage,
      refetch,
      isRefetching,
      isLoading,
    } = useHomeFeedQuery(0);

    const data = useMemo(
      () => feedData?.pages.map((p) => p.deals).flat(1) || [],
      [feedData]
    );

    const { cuisines, dietary_requirements } = useAppSelector(
      (state) => state.home.filters
    );

    const dispatch = useAppDispatch();

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

    const openDeal = (data: GetSingleDealProps) => {
      dispatch(
        setSingleDeal({
          deal_id: data.deal_id,
          location_id: data.location_id,
          stack: HOME_STACK,
          linkRestaurant: true,
        })
      );
    };

    if (isLoading) {
      return <LoadingState text="Searching for deals..." />;
    }

    if (!data?.length) {
      const hasFilters = cuisines.length + dietary_requirements.length > 0;
      return (
        <EmptyState
          title="No results found"
          description={`Sorry, we couldn't find any results ${
            hasFilters
              ? "for your applied filters within your chosen location"
              : "within your chosen location"
          }.`}
          action={hasFilters ? openFilters : navToLocation}
          actionText={hasFilters ? "Adjust Your Filters" : "Change Location"}
          actionIcon={
            hasFilters ? (
              <FilterIcon />
            ) : (
              <Ionicons
                name="map-outline"
                size={21}
                color={tw.color("primary-main")}
              />
            )
          }
        />
      );
    }

    return (
      <FlatList
        ref={ref as React.LegacyRef<FlatList<IFeedDeal>>}
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3`}
        data={data}
        renderItem={({ item }) => (
          <DealCard
            openDeal={openDeal}
            onShare={onShare}
            item={item}
            onLike={onLike}
          />
        )}
        keyExtractor={(item) => `${item.deal.id}-${item.location.id}`}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    );
  }
);

export default HomeFeed;
