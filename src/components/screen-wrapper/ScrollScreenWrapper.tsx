import { ScrollView, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "theme/tailwind";

type Props = { children: ReactNode; header?: ReactNode };

const ScrollScreenWrapper: FC<Props> = ({ children, header }) => {
  // useAppSelector((state) => state.theme.theme);
  return (
    <SafeAreaView style={tw`bg-white dark:bg-grey-950 py-4  flex-1 relative`}>
      {header}
      <ScrollView style={tw`flex-1`}>
        <View style={tw` flex-1 gap-6 min-h-full  `}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenWrapper;
