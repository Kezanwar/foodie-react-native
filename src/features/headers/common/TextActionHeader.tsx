import { View } from "react-native";
import React, { FC } from "react";
import Typography, { LEADING_TIGHT } from "components/typography";
import tw from "theme/tailwind";
import TextButton from "components/buttons/text-button";
import LoadingSpinner from "components/loading-spinner";

type Props = {
  headerText: string;
  rightActionText?: string;
  rightActionOnPress?: () => void;
  loading?: boolean;
  mb?: boolean;
  fontSize?: "large" | "medium";
};

const TextActionHeader: FC<Props> = ({
  headerText,
  rightActionText = "",
  rightActionOnPress,
  loading,
  mb = true,
  fontSize = "large",
}) => {
  return (
    <View
      style={tw` ${mb ? "mb-4" : ""} flex-row items-center justify-between `}
    >
      <Typography
        variant="h6"
        style={`font-bold ${LEADING_TIGHT}  ${
          fontSize === "medium" ? "text-5" : ""
        } `}
      >
        {headerText}
      </Typography>
      {loading ? (
        <LoadingSpinner mt={0} />
      ) : (
        <TextButton
          label={rightActionText}
          textStyle={`font-medium ${LEADING_TIGHT}`}
          onPress={rightActionOnPress}
        />
      )}
    </View>
  );
};

export default TextActionHeader;
