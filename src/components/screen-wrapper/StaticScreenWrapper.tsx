import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "theme/tailwind";

type Props = { children: ReactNode };

const StaticScreenWrapper: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={tw`bg-white dark:bg-grey-950  flex-1 relative`}>
      <View style={tw` flex-1 gap-6 min-h-full p-4 `}>{children}</View>
    </SafeAreaView>
  );
};

export default StaticScreenWrapper;
