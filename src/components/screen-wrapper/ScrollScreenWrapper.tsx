import { ScrollView, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "theme/tailwind";
import { useAppSelector } from "hooks/useAppSelector";

type Props = { children: ReactNode };

const ScrollScreenWrapper: FC<Props> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <SafeAreaView style={tw`bg-white dark:bg-grey-950  flex-1 relative`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw` flex-1 gap-6 min-h-full py-4 `}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenWrapper;
