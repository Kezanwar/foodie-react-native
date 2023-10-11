import React, { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";

import useOptionsQuery from "hooks/queries/useOptionsQuery";

const Test: FC = () => {
  const count = useAppSelector((state) => state.auth.count);

  const { data, isLoading } = useOptionsQuery();

  console.log(data?.data);

  return (
    <>
      <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>
        foodieeee {count}
      </Text>
      {isLoading && <ActivityIndicator color={tw.color("grey-500")} />}
      <View style={tw` flex-row gap-2 justify-center  px-8 flex-wrap mb-6`}>
        {data?.data?.dietary_requirements?.map(({ name, slug }) => (
          <View
            key={slug}
            style={tw`py-1 px-3 rounded-full bg-grey-300 dark:bg-grey-700`}
          >
            <Text
              style={tw`font-light text-xs text-type-light-primary dark:text-type-dark-primary`}
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
