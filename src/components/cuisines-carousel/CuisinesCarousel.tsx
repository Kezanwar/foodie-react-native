import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "components/typography";
import { FlatList } from "react-native-gesture-handler";
import { Fader } from "react-native-ui-lib";

type Props = {};

type GridItem = {
  name: string;
  slug: string;
  color: string;
};
const ITEMS: GridItem[] = [
  {
    name: "Italian",
    slug: "italian",
    color: tw.color("error-main") as string,
  },
  {
    name: "Thai",
    slug: "thai",
    color: tw.color("secondary-main") as string,
  },
  {
    name: "Mediterranean",
    slug: "mediterranean",
    color: tw.color("success-main") as string,
  },
  {
    name: "Mexican",
    slug: "mexican",
    color: tw.color("primary-main") as string,
  },
  {
    name: "Indian",
    slug: "indian",
    color: tw.color("warning-main") as string,
  },
  {
    name: "Beer And Ale",
    slug: "beer-and-ale",
    color: tw.color("success-main") as string,
  },
];

const CuisineGrid: FC<Props> = () => {
  return (
    <View>
      <View style={tw`flex-row items-center  mb-5 gap-1 `}>
        <Typography style="font-medium leading-[0] text-4.5" variant="h6">
          Discover Cuisines
        </Typography>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={ITEMS}
        style={tw`mb-2`}
        ItemSeparatorComponent={() => <View style={tw`w-[4vw]`} />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item.slug}
        snapToInterval={Dimensions.get("window").width * 0.41}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={tw`w-[37vw] h-24 items-center justify-center rounded-md border-[${
                item.color
              }] border bg-[${item.color}${"12"}]`}
              key={item.slug}
            >
              <Ionicons
                name="restaurant-outline"
                size={16}
                color={item.color}
              />
              <Typography
                style={`text-3.6 mt-1.5 w-[80%] text-center font-medium text-[${item.color}]`}
                variant="body1"
              >
                {item.name}
              </Typography>
            </TouchableOpacity>
          );
        }}
      />
      <Fader visible size={20} position={Fader.position.END} />
    </View>
  );
};

export default CuisineGrid;
