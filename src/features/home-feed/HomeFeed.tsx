import { Alert, FlatList, Share } from "react-native";
import React, { FC } from "react";
import useHomeFeedQuery from "hooks/queries/useHomeFeedQuery";
import DealCard from "components/deal-card";
import tw from "theme/tailwind";

type Props = {};

const HomeFeed: FC<Props> = ({}) => {
  const { data: feedData, refetch, fetchNextPage } = useHomeFeedQuery(0);

  const data = feedData?.pages.map((p) => p.deals).flat(1) || [];

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
  return data?.length ? (
    <FlatList
      contentContainerStyle={tw`bg-grey-200 gap-3`}
      data={data}
      renderItem={({ item }) => <DealCard onShare={onShare} item={item} />}
      keyExtractor={(item) => item.deal.id + item.location.id}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  ) : (
    ""
  );
};

export default HomeFeed;
