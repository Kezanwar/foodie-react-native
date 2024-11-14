import { View } from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { StaticScreenWrapper } from "components/screen-wrapper";

type Props = {};

const UpdateRequired: FC<Props> = ({}) => {
  return (
    <StaticScreenWrapper>
      <View
        style={tw`flex-1 py-2 justify-center  px-7   bg-white dark:bg-grey-800`}
      >
        <Typography variant="h6" style={" font-bold text-center mb-2  "}>
          App Update Required
        </Typography>
        <Typography variant="body2" style={" text-center mt-4 text-grey-600  "}>
          We’re always working to improve your experience. To keep using the
          latest features and ensure the best performance, please update to the
          newest version of our app.
        </Typography>
        <View style={tw`px-7 mt-12`}></View>
      </View>
    </StaticScreenWrapper>
  );
};

export default UpdateRequired;
