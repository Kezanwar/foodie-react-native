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

  const { data, isLoading, isError } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  const deal = data?.data;

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
            <IconButton onPress={goBack}>
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
                    style={tw`rounded-full w-17 items-center justify-center bg-grey-200 py-1.5 px-3`}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      style="-m-1 text-3.45"
                    >
                      Follow
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

const Bio: FC<{ text: string }> = ({ text }) => {
  return (
    <View style={tw`mt-4 px-6`}>
      <Typography variant="body2" color="text.secondary" style="leading-[1.6]">
        {text}
      </Typography>
    </View>
  );
};
