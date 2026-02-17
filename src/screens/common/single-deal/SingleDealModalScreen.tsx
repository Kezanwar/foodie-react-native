import { TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode, useMemo } from "react";
import tw from "theme/tailwind";
import { AntDesign } from "@expo/vector-icons";
import Typography, { LEADING_TIGHT } from "components/typography";
import Divider from "components/divider";
import { ChipContainer } from "components/chip";
import ChipReadOnly from "components/chip/ChipReadOnly";
import LikeButton from "components/buttons/like-button";
import FollowButton from "components/buttons/follow-button";
import EmptyState from "components/empty-state/EmptyState";
import useSingleDealQuery from "hooks/queries/useSingleDealQuery";
import { external_navigate } from "hocs/app-ready/providers/navigation/Navigation";
import { SingleDealState } from "store/single-deal";
import RestaurantAvatar from "components/restaurant-avatar";
import { getDistanceInMiles } from "utils/distance";
import { useAppSelector } from "hooks/useAppSelector";
import LoadingSpinner from "components/loading-spinner";
import useIsFavourited from "hooks/useIsFavourited";
import useMutateDealFavourites from "hooks/useMutateDealFavourites";
import useMutateRestFollows from "hooks/useMutateRestFollows";
import useIsFollowing from "hooks/useIsFollowing";

const default_error_message =
  "Sorry we can't seem to find that deal, it may have been deleted";

const SingleDealModalScreen: FC<SingleDealState & { close: () => void }> = ({
  deal_id,
  location_id,
  stack,
  close,
  linkRestaurant,
}) => {
  const {
    data: deal,
    isLoading,
    isError,
    error,
  } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  const is_favourited = useIsFavourited(deal_id, location_id);
  const is_following = useIsFollowing(location_id);

  const { favourite, unfavourite } = useMutateDealFavourites();

  const onLike = async () => {
    if (deal) {
      if (!is_favourited) {
        favourite({
          deal_id: deal._id,
          location_id: deal.location._id,
        });
      } else {
        unfavourite({
          deal_id: deal._id,
          location_id: deal.location._id,
        });
      }
    }
  };

  const { follow, unfollow } = useMutateRestFollows();

  const onFollow = async () => {
    if (deal) {
      if (!is_following) {
        follow(deal.location._id);
      } else {
        unfollow(deal.location._id);
      }
    }
  };

  const navRest = () => {
    if (linkRestaurant) {
      close();
      setTimeout(() => {
        external_navigate(stack?.SINGLE_RESTAURANT, {
          location_id,
          stack,
        });
      }, 300);
    }
  };

  const userLocationCoords = useAppSelector(
    (state) => state.location.location?.coords,
  );

  const distance = useMemo(() => {
    if (deal?.location && userLocationCoords) {
      return getDistanceInMiles(deal?.location.coordinates, [
        userLocationCoords?.longitude,
        userLocationCoords?.latitude,
      ]);
    } else return 0;
  }, [deal?.location.coordinates, userLocationCoords]);

  if (isLoading) {
    return (
      <BaseWrapper>
        <LoadingSpinner />
      </BaseWrapper>
    );
  }

  if (!deal || isError)
    return (
      <BaseWrapper>
        <EmptyState
          title="Oops!"
          description={error?.message || default_error_message}
          action={close}
          actionText="Ok"
        />
      </BaseWrapper>
    );

  return (
    <BaseWrapper>
      <View style={tw` gap-2`}>
        <View style={tw`flex-row justify-between mb-1`}>
          <View style={tw`flex-row items-start gap-2`}>
            <AntDesign
              name="tag"
              size={20}
              color={tw.color("primary-main")}
              style={tw`-mt-0.5`}
            />
            <Typography variant="h6" style="font-bold text-4.3 max-w-[90%] ">
              {deal.name}
            </Typography>
          </View>
          <View style={tw`items-start justify-end  -m-0.5  flex-row gap-1`}>
            {/* <ShareButton onPress={() => {}} /> */}
            <LikeButton liked={is_favourited} onPress={onLike} />
          </View>
        </View>

        <Typography variant="body2" color="text.secondary">
          {deal.description.trim()}
        </Typography>
      </View>
      <ChipContainer style="mt-5">
        {deal.cuisines.map(({ name, slug }) => (
          <ChipReadOnly key={slug} size="lg" label={name} />
        ))}
        {deal.dietary_requirements.map(({ name, slug }) => (
          <ChipReadOnly key={slug} size="lg" label={name} />
        ))}
      </ChipContainer>
      <Divider my="6" />
      <View style={tw` flex-row  items-center gap-4`}>
        <TouchableOpacity
          activeOpacity={linkRestaurant ? 0.8 : 1}
          onPress={navRest}
        >
          <RestaurantAvatar source={{ uri: deal.restaurant.avatar }} />
        </TouchableOpacity>
        <View style={tw`gap-2`}>
          <TouchableOpacity
            activeOpacity={linkRestaurant ? 0.8 : 1}
            onPress={navRest}
          >
            <View style={tw`flex-row items-center gap-1 flex-wrap`}>
              <Typography
                variant="h6"
                style={`font-bold text-4.3 max-w-80 ${LEADING_TIGHT}`}
              >
                {deal.restaurant.name}
              </Typography>
              <Typography
                variant="body1"
                style={`text-3.5 ${LEADING_TIGHT}`}
                color="text.secondary"
              >
                ({deal.location.nickname})
              </Typography>
            </View>
          </TouchableOpacity>
          <View style={tw`gap-3 items-center flex-row`}>
            <FollowButton onPress={onFollow} following={is_following} />
            <Typography
              variant="body2"
              color="success.main"
              style=" font-medium  text-3.25"
            >
              {distance.toFixed(1)} Miles
            </Typography>
          </View>
        </View>
      </View>
    </BaseWrapper>
  );
};

export default SingleDealModalScreen;

const BaseWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <View style={tw`flex-1 bg-white px-5 py-6 relative`}>{children}</View>;
};
