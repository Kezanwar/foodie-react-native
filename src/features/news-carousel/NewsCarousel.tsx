import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import { BlogItem } from "types/blog";
import { Image } from "expo-image";
import { Fader } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";

const iconCol = tw.color("primary-main");

type Props = {
  blogs?: BlogItem[];
};

const NewsCarousel: FC<Props> = ({ blogs }) => {
  return (
    <View>
      <View style={tw`mb-5  gap-1`}>
        <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
          News & Insights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          updates from the Foodie team
        </Typography>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={blogs}
        ItemSeparatorComponent={() => <View style={tw`w-[4vw]`} />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item.slug}
        snapToInterval={Dimensions.get("window").width * 0.74}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={tw`w-[70vw] rounded-md`}>
              <Image
                style={tw`h-32 w-[70vw] rounded-md`}
                source={{ uri: item.featuredImage }}
              />
              <View style={tw`mt-3 gap-1.5`}>
                <Typography style=" font-medium text-3.75" variant="body1">
                  {item.title}
                </Typography>
                <Typography
                  numberOfLines={2}
                  style="text-3.25 leading-[1.6]"
                  variant="body1"
                  color="text.secondary"
                >
                  {item.excerpt}
                </Typography>
                <View style={tw`flex-row gap-1.5 items-center`}>
                  <Ionicons name="glasses-outline" size={24} color={iconCol} />
                  <Typography
                    style="text-3"
                    variant="body1"
                    color="text.secondary"
                  >
                    {item.restaurant_review_fields.readTime} minute read
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Fader visible size={30} position={Fader.position.END} />
    </View>
  );
};

export default NewsCarousel;
