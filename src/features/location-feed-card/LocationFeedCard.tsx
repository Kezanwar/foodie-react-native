import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import Typography from "components/typography";
import ShareButton from "components/buttons/share-button";
import { IHomeFeedItem } from "types/home-feed";
import RestaurantAvatar from "components/restaurant-avatar";
import { DealChipReadOnly } from "components/deal-chip";
import { ChipContainer } from "components/chip";

type Props = {
  item: IHomeFeedItem;
  onShare: (name: string) => void;
  showActions?: boolean;
  navToRest: (location_id: string) => void;
};

const LocationFeedCard: FC<Props> = ({ item, onShare, navToRest }) => {
  const dealsToShow = useMemo(() => {
    return item.location.active_deals.slice(0, 3);
  }, []);

  const total = item.location.active_deals.length;
  const diff = total - dealsToShow.length;
  const hasMore = diff > 0;

  return (
    <TouchableOpacity
      onPress={() => navToRest(item.location._id)}
      activeOpacity={0.8}
      style={tw`bg-white px-5 py-6`}
    >
      <View style={tw`relative`}>
        <Image
          style={tw`h-35 rounded-md `}
          source={{ uri: item.restaurant.cover_photo }}
        />
      </View>

      <View style={tw` mt-4 flex-row items-start justify-between mb-3`}>
        <View style={tw`gap-1.5`}>
          {/* <View style={tw`flex-row flex-wrap gap-2 flex-1 items-center`}> */}
          {/* <RestaurantAvatar
              size="md"
              source={{ uri: item.restaurant.avatar }}
            /> */}
          {/* <Ionicons
              name="restaurant-outline"
              size={20}
              color={tw.color("primary-main")}
              style={tw`-mt-0.5`}
            /> */}
          <View style={tw`gap-1`}>
            <Typography
              style=" font-medium leading-[1.3] text-4"
              variant="body1"
            >
              {item.restaurant.name}
            </Typography>
            {item.location?.nickname && (
              <Typography
                style="text-3.5"
                variant="body2"
                color="text.secondary"
              >
                {item.location.nickname}
              </Typography>
            )}
            {/* </View> */}
          </View>
        </View>
        <View style={tw`gap-2.25`}>
          <View style={tw`items-start justify-end  -mt-.5  flex-row gap-1`}>
            <ShareButton
              onPress={() =>
                onShare(`${item.restaurant.name} | ${item.location.nickname})`)
              }
            />
          </View>
          <Typography
            variant="body2"
            color="success.main"
            style=" font-medium text-3.25"
          >
            {item.location.distance_miles.toFixed(1)} Miles
          </Typography>
        </View>
      </View>
      {dealsToShow.length > 0 && (
        <ChipContainer
        //   style={tw`gap-3 mt-5 p-3 border border-dashed border-grey-200 rounded-lg`}
        >
          {dealsToShow.map((deal) => {
            return <DealChipReadOnly label={deal.name} key={deal.deal_id} />;
          })}
          {hasMore && <DealChipReadOnly icon={false} label={`+${diff}`} />}
        </ChipContainer>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(LocationFeedCard);
