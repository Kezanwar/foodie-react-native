import React, { FC, useEffect } from "react";
import { Text } from "react-native";

import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";

import useOptionsQuery from "hooks/queries/useOptionsQuery";

const Test: FC = () => {
  const count = useAppSelector((state) => state.auth.count);

  const { data } = useOptionsQuery();

  console.log(data?.data);

  return (
    <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>
      foodieeee {count}
    </Text>
  );
};

export default Test;
