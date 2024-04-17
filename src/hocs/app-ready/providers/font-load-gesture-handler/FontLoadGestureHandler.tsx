import React, { FC, ReactNode, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tw from "theme/tailwind";
import * as SplashScreen from "expo-splash-screen";
import useLoadFonts from "hooks/useLoadFonts";

type Props = { children: ReactNode };

SplashScreen.preventAutoHideAsync();

const FontLoadGestureHandler: FC<Props> = ({ children }) => {
  const [fontsLoaded] = useLoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={tw`flex-1 relative`}
    >
      {children}
    </GestureHandlerRootView>
  );
};

export default FontLoadGestureHandler;
