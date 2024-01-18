import { View } from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { Badge } from "react-native-ui-lib";

type Props = {
  title: string;
  count: string;
  error?: boolean;
  mb: boolean;
};

const TitleBadgeCounter: FC<Props> = ({ title, count, error, mb }) => {
  return (
    <View style={tw`relative self-start ${mb ? "mb-4" : ""}`}>
      <Typography variant="subheader" style={" text-lg"}>
        {title}
      </Typography>
      {count && (
        <Badge
          size={16}
          backgroundColor={
            error ? tw.color("error-main") : tw.color("success-main")
          }
          style={tw`absolute right-[-3] top-[-3] font-light`}
          label={count}
        />
      )}
    </View>
  );
};

export default TitleBadgeCounter;
