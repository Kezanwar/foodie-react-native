import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";

type Props = {
  headerText: string;
  rightActionText?: string;
  rightActionOnPress?: () => void;
  loading?: boolean;
};

const TextActionHeader: FC<Props> = ({
  headerText,
  rightActionText,
  rightActionOnPress,
  loading,
}) => {
  return (
    <View style={tw` mb-4 flex-row items-center justify-between `}>
      <Typography variant="h6" style={" font-semi-bold leading-tight "}>
        {headerText}
      </Typography>
      {loading ? (
        <ActivityIndicator size={"small"} color={tw.color("primary-main")} />
      ) : (
        <TouchableOpacity onPress={rightActionOnPress}>
          <Typography
            variant="body2"
            style="font-medium leading-tight"
            color="primary.main"
          >
            {rightActionText}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextActionHeader;
