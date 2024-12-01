import { View } from "react-native";
import React, { FC } from "react";

import tw from "theme/tailwind";
import Typography from "components/typography";
import LoadingSpinner from "components/loading-spinner";

type Props = { style?: string; text?: string };

const LoadingState: FC<Props> = ({ style = "", text }) => {
  return (
    <View style={tw`p-5 flex-1 bg-white ${style}`}>
      <LoadingSpinner mt={0} />
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
