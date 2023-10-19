import React, { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import tw from "theme/tailwind";

import useOptionsQuery from "hooks/queries/useOptionsQuery";

const Test: FC = () => {
  const { data, isLoading } = useOptionsQuery();

  return (
    <>
      <Text style={tw`font-black text-3xl text-grey-950  dark:text-white`}>
        foodieeee
      </Text>
      {isLoading && <ActivityIndicator color={tw.color("grey-500")} />}
      <View style={tw` flex-row gap-2 justify-center  px-8 flex-wrap `}>
        {data?.data?.dietary_requirements?.map(({ name, slug }) => (
          <View
            key={slug}
            style={tw`py-1 px-3 rounded-full bg-grey-300 dark:bg-grey-700`}
          >
            <Text
              style={tw`font-light  text-type-light-primary dark:text-type-dark-primary`}
            >
              {name}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default Test;
