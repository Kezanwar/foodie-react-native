import { FlatList, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

import { Image } from "expo-image";

import { Ionicons } from "@expo/vector-icons";

import tw from "theme/tailwind";

import Typography, { LEADING_TIGHT } from "components/typography";
import CarouselDivider from "components/separators/carousel-divider";

import { BlogItem } from "types/blog";
import useBrowser from "hooks/useBrowser";
import {
  CAROUSEL_CARD_WIDTH,
  CAROUSEL_TOTAL_ITEM_WIDTH,
} from "constants/theme";

const iconCol = tw.color("primary-main");

const style = [{ width: CAROUSEL_CARD_WIDTH }, tw`rounded-lg`];

type Props = {
  blogs?: BlogItem[];
};

const NewsCarousel: FC<Props> = React.memo(({ blogs }) => {
  const open = useBrowser();

  const onBlogPress = async (slug: string) => {
    await open(`https://www.thefoodie.app/news/${slug}`);
  };

  return (
    <View>
      <View style={tw`mb-5  gap-1`}>
        <Typography style={`font-bold ${LEADING_TIGHT} text-4.5`} variant="h6">
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
        ItemSeparatorComponent={() => <CarouselDivider />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item.slug}
        snapToInterval={CAROUSEL_TOTAL_ITEM_WIDTH}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onBlogPress(item.slug)}
              style={style}
            >
              <Image
                style={tw`h-32  rounded-lg`}
                source={{ uri: item.featuredImage }}
              />
              <View style={tw`mt-3 gap-1.5`}>
                <Typography
                  style={`font-semi-bold ${LEADING_TIGHT} text-3.75`}
                  variant="body1"
                >
                  {item.title}
                </Typography>
                <Typography
                  numberOfLines={2}
                  style="text-3.25 "
                  variant="body1"
                  color="text.secondary"
                >
                  {item.excerpt}
                </Typography>
                <View style={tw`flex-row gap-1.5 items-center`}>
                  <Ionicons name="glasses-outline" size={24} color={iconCol} />
                  <Typography
                    style="text-3.25"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.restaurant_review_fields.readTime} minute read
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

export default NewsCarousel;
