import { useCallback } from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeviceContext } from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import "react-native-get-random-values";

import tw from "theme/tailwind";

import { Provider } from "react-redux";
import { store } from "store/store";

import useLoadFonts from "hooks/useLoadFonts";

import CustomStatusBar from "components/custom-status-bar";
import Snackbar from "components/snackbar/Snackbar";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "navigation/root";
import { enableFreeze } from "react-native-screens";

enableFreeze(true);

// const LightTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: "white",
//   },
// };

// const DARK_THEME = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     background: tw.color("background-dark-default") as string,
//   },
// };

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });

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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <View style={tw`flex-1 relative`} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <RootNavigator />
            <Snackbar />
          </NavigationContainer>
        </View>
        <CustomStatusBar />
      </Provider>
    </QueryClientProvider>
  );
}
