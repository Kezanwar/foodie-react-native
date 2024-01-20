import { ActivityIndicator, View } from "react-native";
import React, { FC } from "react";
import LottieView from "lottie-react-native";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

type Props = { style?: string; text?: string };

const LoadingState: FC<Props> = ({ style = "", text }) => {
  return (
    <View style={tw`p-6 flex-1 bg-white ${style}`}>
      <ActivityIndicator color={tw.color("primary-main")} />
      {text && (
        <Typography
          style="text-center mt-3"
          variant="body2"
          color="text.secondary"
        >
          {text}
        </Typography>
      )}
    </View>
  );
};

export default LoadingState;
