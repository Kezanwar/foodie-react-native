import { ScrollView, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "theme/tailwind";

type Props = { children: ReactNode };

const ScreenWrapper: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={tw`bg-white dark:bg-grey-950  flex-1 relative`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw` items-center flex-1 gap-6 min-h-full p-3`}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
