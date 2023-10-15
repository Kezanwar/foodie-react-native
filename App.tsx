import { useCallback } from "react";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import * as SplashScreen from "expo-splash-screen";

import tw from "theme/tailwind";

import { Provider } from "react-redux";
import { store } from "store/store";

import useLoadFonts from "hooks/useLoadFonts";

import CustomStatusBar from "components/custom-status-bar";

import Snackbar from "components/snackbar/Snackbar";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "navigation/root";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

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
        <SafeAreaView
          style={tw`bg-white dark:bg-grey-950  flex-1 relative`}
          onLayout={onLayoutRootView}
        >
          <NavigationContainer>
            <RootNavigator />
            <Snackbar />
          </NavigationContainer>
        </SafeAreaView>

        <CustomStatusBar colorScheme={colorScheme} />
      </Provider>
    </QueryClientProvider>
  );
}

{
  /* <ScrollView style={tw`flex-1`}>
              <View style={tw` items-center flex-1 gap-6 min-h-screen p-3`}>
                <Test />
                <Alert
                  title="How do we use this?"
                  content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                at aperiam deleniti culpa consequuntur ad fuga"
                  variant="error"
                />
                <Alert
                  title="How do we use this?"
                  content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                at aperiam deleniti culpa consequuntur ad fuga."
                  variant="warning"
                />
                <Alert
                  title="How do we use this?"
                  content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                at aperiam deleniti culpa consequuntur ad fuga."
                  variant="info"
                />
                <Alert
                  title="How do we use this?"
                  content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                at aperiam deleniti culpa consequuntur ad fuga."
                  variant="success"
                />

                <Text
                  style={tw`font-light text-base dark:text-type-dark-primary text-type-light-secondary text-center`}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Autem at aperiam deleniti culpa consequuntur ad fuga,
                  consectetur quis sequi. Facilis, labore? Numquam cupiditate
                  incidunt omnis esse eos necessitatibus facilis tempora
                </Text>

                <TouchableOpacity style={tw`mt-2`} onPress={toggleColorScheme}>
                  <Text style={tw`dark:text-white`}>
                    Toggle Dark/Light Mode
                  </Text>
                </TouchableOpacity>
                <TestThree />
              </View>
            </ScrollView> */
}
