import { Image, ImageBackground, ScrollView, View } from "react-native";
import React, { FC } from "react";

import { GetSingleDealProps } from "types/single-deal";
import useSingleDealQuery from "hooks/queries/useSingleDealQuery";
import { LoadingScreen } from "components/loading-screen";
import tw from "theme/tailwind";
import IconButton from "components/buttons/icon-button";
import { AntDesign } from "@expo/vector-icons";

import { Typography } from "components/typography";

import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "components/divider";
import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";

const SingleDeal: FC = ({ route, navigation }: any) => {
  const { deal_id, location_id } = route.params as GetSingleDealProps;

  const { data, isLoading, isError } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  if (isLoading) return <LoadingScreen />;

  const deal = data?.data;

  const goBack = () => navigation.goBack();

  return (
    <>
      <StatusBar style="light" />
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`relative`}>
          <ImageBackground
            style={tw`h-50 w-full `}
            source={{ uri: deal?.restaurant.cover_photo }}
          >
            <View style={tw`w-full h-full bg-[rgba(0,0,0,0.1)]`} />
          </ImageBackground>

          {/* <IconButton onPress={goBack} style={tw`absolute top-6 right-4`}>
            <AntDesign name="close" size={28} color="white" /> */}

          {/* </IconButton> */}
        </View>
        <View style={tw`px-6`}>
          <View style={tw` pt-5 flex-row  items-center gap-4`}>
            <Image
              style={tw` rounded-full  w-18  h-18  `}
              source={{ uri: deal?.restaurant.avatar }}
            />

            <View style={tw`gap-2`}>
              <Typography variant="h6" style="font-medium text-5">
                {deal?.restaurant.name}
                <Typography
                  variant="h6"
                  style="font-light text-4"
                  color="text.secondary"
                >
                  {"  "}({deal?.location.nickname})
                </Typography>
              </Typography>
              <View style={tw`gap-3 items-center flex-row`}>
                <TouchableOpacity
                  style={tw`rounded-full w-16 items-center justify-center bg-grey-200 py-1.5 px-3`}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    style="-m-1 text-3"
                  >
                    Follow
                  </Typography>
                </TouchableOpacity>
                <Typography
                  variant="body2"
                  color="success.main"
                  style=" font-medium  text-3.25"
                >
                  {deal?.distance_miles.toFixed(1)} Miles
                </Typography>
              </View>
            </View>
          </View>

          <Divider />

          <View style={tw` gap-2`}>
            <View style={tw`flex-row items-center gap-2`}>
              <AntDesign
                name="tago"
                size={22}
                color={tw.color("primary-main")}
                style={tw`-mt-1`}
              />
              <Typography variant="h6" style="font-medium text-4 ">
                {deal?.name}
              </Typography>
            </View>

            <Typography variant="body2" color="text.secondary">
              {deal?.description}
            </Typography>
          </View>

          {/* <View style={tw`flex-row gap-2 justify-center`}>
            <TouchableOpacity style={tw`flex-1 w-[100%]`}>
              <Typography variant="body2" color="text.primary" style="-m-1">
                Favourite
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-1`}>
              <Typography variant="body2" color="text.primary" style="-m-1">
                Share
              </Typography>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

export default SingleDeal;

// const styles = StyleSheet.create({
//   filters
// });
