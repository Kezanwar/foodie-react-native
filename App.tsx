import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Test from "components/Test";
import CustomStatusBar from "components/custom-status-bar";

import tw from "lib/theme/tailwind";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={tw`bg-white dark:bg-grey-950  flex-1 justify-center items-center px-3`}
      onLayout={onLayoutRootView}
    >
      <Test />
      <Text style={tw`font-light dark:text-4xl dark:text-white`}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem at
        aperiam deleniti culpa consequuntur ad fuga, consectetur quis sequi.
        Facilis, labore? Numquam cupiditate incidunt omnis esse eos
        necessitatibus facilis tempora
      </Text>

      <TouchableOpacity onPress={toggleColorScheme}>
        <Text style={tw`dark:text-white`}>Toggle Dark/Light Mode</Text>
      </TouchableOpacity>
      <CustomStatusBar colorScheme={colorScheme} />
    </View>
  );
}
