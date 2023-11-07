import { Typography } from "components/typography";
import React from "react";
import { View } from "react-native";
import tw from "theme/tailwind";

type Props = {};

const Line: React.FC = () => (
  <View style={tw`h-[0.1] w-4 bg-type-light-secondary`} />
);

const Or: React.FC<Props> = (props) => {
  return (
    <View style={tw`flex-row justify-center items-center gap-2`}>
      <Line />
      <Typography variant="body2" color="text.secondary">
        Or
      </Typography>
      <Line />
    </View>
  );
};

export default Or;
