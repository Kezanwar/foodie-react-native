import React, { FC } from "react";
import { Text } from "react-native";

import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";

import useOptionsQuery from "hooks/queries/useOptionsQuery";
import { IColorMap } from "types/colors";

type Props = {
  color?: IColorMap;
};

const Test: FC<Props> = ({ color }) => {
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
