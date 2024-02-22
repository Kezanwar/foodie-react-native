import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import { Typography } from "components/typography";
import { FlatList } from "react-native-gesture-handler";
import { Fader } from "react-native-ui-lib";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StoreFront from "components/svgs/store-front";

type Props = {};

type GridItem = {
  name: string;
  slug: string;
  imageURI: string;
};
const ITEMS: GridItem[] = [
  {
    name: "Italian",
    slug: "italian",
    imageURI:
      "https://tb-static.uber.com/prod/image-proc/processed_images/69f59d92d1952c4df0bb82a275aebebb/c9252e6c6cd289c588c3381bc77b1dfc.jpeg",
  },
  {
    name: "Thai",
    slug: "thai",
    imageURI:
      "https://tb-static.uber.com/prod/image-proc/processed_images/40eb8b649148a320a1f57689cf3c2561/16bb0a3ab8ea98cfe8906135767f7bf4.webp",
  },
  {
    name: "Mediterranean",
    slug: "mediterranean",
    imageURI:
      "https://tb-static.uber.com/prod/image-proc/processed_images/b8f7af1b3533628726f557d05fbc639b/16bb0a3ab8ea98cfe8906135767f7bf4.webp",
  },
  {
    name: "Mexican",
    slug: "mexican",
    imageURI:
      "https://d1ralsognjng37.cloudfront.net/f9689192-bdd2-4e73-9d61-86e52719b3e7.jpeg",
  },
  {
    name: "Indian",
    slug: "indian",
    imageURI:
      "https://d1ralsognjng37.cloudfront.net/d1642e65-8b05-43e2-a039-3a5b0f94d44c.jpeg",
  },
];

const RestaurantsCarousel: FC<Props> = () => {
  return (
    <View>
      <View style={tw`flex-row items-center  mb-5 gap-2 `}>
        {/* <StoreFront color={tw.color("primary-main") as string} /> */}

        <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
          Popular Restaurants
        </Typography>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={ITEMS}
        ItemSeparatorComponent={() => <View style={tw`w-[4vw]`} />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item.slug}
        snapToInterval={Dimensions.get("window").width * 0.74}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={tw`w-[70vw] rounded-md`} key={item.slug}>
              <Image
                style={tw`h-32 w-[70vw] rounded-md`}
                source={{ uri: item.imageURI }}
              />

              <Typography style="mt-2" variant="body1">
                {item.name}
              </Typography>
            </TouchableOpacity>
          );
        }}
      />
      <Fader visible size={30} position={Fader.position.END} />
    </View>
  );
};

export default RestaurantsCarousel;
