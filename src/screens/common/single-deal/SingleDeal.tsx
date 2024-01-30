import { Image, ImageBackground, ScrollView, View } from "react-native";
import React, { FC, useMemo, useState } from "react";

import { GetSingleDealProps } from "types/single-deal";
import useSingleDealQuery from "hooks/queries/useSingleDealQuery";
import { LoadingScreen } from "components/loading-screen";
import tw from "theme/tailwind";
import IconButton from "components/buttons/icon-button";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Typography } from "components/typography";

import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "components/divider";
import { StatusBar } from "expo-status-bar";
import { ChipContainer } from "components/chip";
import ChipReadOnly from "components/chip/ChipReadOnly";
import { TabController, TabControllerItemProps } from "react-native-ui-lib";
import MapView, { Marker, Region } from "react-native-maps";
import BookingInfo from "components/booking-info";
import OpeningTimes from "components/opening-times/OpeningTimes";
import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import { followRestaurant, unFollowRestaurant } from "lib/api/api";
import useMutateFollowingRest from "hooks/queries/useMututateFollowingRest";

const tabControllerItems: TabControllerItemProps[] = [
  {
    label: "Map View",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    labelStyle: tw`font-medium`,
    selectedLabelColor: tw.color("primary-main"),
  },
  {
    label: "Booking Info",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    labelStyle: tw`font-medium`,
    selectedLabelColor: tw.color("primary-main"),
  },
  {
    label: "Opening Times",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    labelStyle: tw`font-medium`,
    selectedLabelColor: tw.color("primary-main"),
  },
];

const SingleDeal: FC = ({ route, navigation }: any) => {
  const { deal_id, location_id } = route.params as GetSingleDealProps;

  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const {
    data: deal,
    isLoading,
    isError,
  } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  const CarouselItems = useMemo(() => {
    return deal
      ? [
          <MapView
            minZoomLevel={10}
            showsUserLocation
            mapType="terrain"
            showsPointsOfInterest
            region={
              {
                latitude: deal.location.geometry.coordinates[1],
                longitude: deal.location.geometry.coordinates[0],
              } as Region
            }
            style={tw`h-50 m-6 mt-5 rounded-md`}
          >
            <Marker
              coordinate={{
                latitude: deal.location.geometry.coordinates[1],
                longitude: deal.location.geometry.coordinates[0],
              }}
              pinColor={tw.color("primary-main")}
            />
          </MapView>,
          <BookingInfo location={deal.location} restuarant={deal.restaurant} />,
          <OpeningTimes location={deal.location} />,
        ]
      : [];
  }, [deal]);

  console.log(deal?.is_following);

  const [mutateFavAdd, mutateFavRemove] = useMutateFavouriteDeal();

  const onLike = async () => {
    if (deal)
      try {
        if (!deal.is_favourited) {
          mutateFavAdd.mutate({
            deal_id: deal._id,
            location_id: deal.location._id,
          });
        } else {
          mutateFavRemove.mutate({
            deal_id: deal._id,
            location_id: deal.location._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
  };

  const [mutateFollowAdd, mutateFollowRemove] = useMutateFollowingRest();

  const onFollow = async () => {
    if (deal)
      try {
        if (deal.is_following) {
          mutateFollowRemove.mutate({
            location_id: deal.location._id,
            rest_id: deal.restaurant.id,
          });
        } else {
          mutateFollowAdd.mutate({
            location_id: deal.location._id,
            rest_id: deal.restaurant.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
  };

  if (isLoading) return <LoadingScreen />;

  if (!deal) return null;

  const goBack = () => navigation.goBack();

  return (
    <>
      <StatusBar style="light" />
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`relative`}>
          <ImageBackground
            style={tw`h-45 w-full `}
            source={{ uri: deal.restaurant.cover_photo }}
          >
            <View style={tw`w-full h-full bg-[rgba(0,0,0,0.3)]`} />
          </ImageBackground>

          <View style={tw`absolute top-6 right-6 flex-row items-center gap-3`}>
            <IconButton onPress={goBack}>
              <Ionicons
                name="md-share-outline"
                size={23}
                color={"white"}
                style={tw`-mt-0.5`}
              />
            </IconButton>
            <IconButton onPress={onLike}>
              <AntDesign
                name={deal.is_favourited ? "heart" : "hearto"}
                size={20}
                color={deal.is_favourited ? tw.color("error-main") : "white"}
              />
            </IconButton>
          </View>
        </View>
        <ScrollView contentContainerStyle={tw`pb-20`}>
          <View style={tw`px-6`}>
            <View style={tw` pt-5 flex-row  items-center gap-4`}>
              <Image
                style={tw` rounded-full  w-18  h-18  `}
                source={{ uri: deal.restaurant.avatar }}
              />

              <View style={tw`gap-2`}>
                <Typography variant="h6" style="font-medium text-5 max-w-70">
                  {deal.restaurant.name}
                  <Typography
                    variant="h6"
                    style="font-light text-4"
                    color="text.secondary"
                  >
                    {"  "}({deal.location.nickname})
                  </Typography>
                </Typography>
                <View style={tw`gap-3 items-center flex-row`}>
                  <TouchableOpacity
                    onPress={onFollow}
                    style={tw`rounded-full w-17 items-center justify-center ${
                      deal.is_following
                        ? "bg-primary-main text-white w-22 "
                        : "bg-grey-200 w-17"
                    } py-2 px-3`}
                  >
                    <Typography
                      variant="body2"
                      color={deal.is_following ? "white" : "text.primary"}
                      style="-m-1 text-3.45"
                    >
                      {deal.is_following ? "Following" : "Follow"}
                    </Typography>
                  </TouchableOpacity>
                  <Typography
                    variant="body2"
                    color="success.main"
                    style=" font-medium  text-3.25"
                  >
                    {deal.distance_miles.toFixed(1)} Miles
                  </Typography>
                </View>
              </View>
            </View>

            <Divider />

            <View style={tw` gap-2`}>
              <View style={tw`flex-row items-center gap-2`}>
                <AntDesign
                  name="tago"
                  size={20}
                  color={tw.color("primary-main")}
                  style={tw`-mt-0.5`}
                />
                <Typography variant="h6" style="font-medium text-4.5 ">
                  {deal.name}
                </Typography>
              </View>

              <Typography
                variant="body2"
                color="text.secondary"
                style="leading-[1.6]"
              >
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
            <Divider style="mt-5 mb-2" />
          </View>
          <TabController
            onChangeIndex={(i) => setCarouselIndex(i)}
            asCarousel
            useSafeArea
            items={tabControllerItems}
          >
            <TabController.TabBar
              indicatorStyle={tw`h-[1px] bg-primary-main `}
              height={32}
              spreadItems={false}
              containerStyle={tw`mx-2`}
              items={tabControllerItems}
            />
            {CarouselItems[carouselIndex]}
          </TabController>
        </ScrollView>
      </View>
    </>
  );
};

export default SingleDeal;