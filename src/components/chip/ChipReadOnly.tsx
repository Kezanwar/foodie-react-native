import { Text, View } from "react-native";
import React, { FC } from "react";

import tw from "theme/tailwind";

type Props = {
  label: string;
};

const ChipReadOnly: FC<Props> = ({ label }) => {
  return (
    <View style={tw`py-1 px-3 bg-grey-200 rounded-full`}>
      <Text style={tw`font-light  text-[2.5]`}>{label}</Text>
    </View>
  );
};

export default ChipReadOnly;
