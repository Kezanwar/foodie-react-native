import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "theme/tailwind";
import Test from "components/Test";
import Alert from "components/alert/Alert";

import TestThree from "components/TestThree";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppColorScheme } from "twrnc";
import { useAppSelector } from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { DARK, LIGHT } from "constants/theme";
import { setTheme } from "store/theme/theme.slice";

const Components = () => {
  const [, , setColorScheme] = useAppColorScheme(tw);

  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleColorScheme = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT;

    setColorScheme(newTheme);
    dispatch(setTheme(newTheme));
  };

  return (
    <SafeAreaView style={tw`bg-white dark:bg-grey-950  flex-1 relative`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw` items-center flex-1 gap-6 min-h-full p-3`}>
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem at
            aperiam deleniti culpa consequuntur ad fuga, consectetur quis sequi.
            Facilis, labore? Numquam cupiditate incidunt omnis esse eos
            necessitatibus facilis tempora
          </Text>

          <TouchableOpacity style={tw`mt-2`} onPress={toggleColorScheme}>
            <Text style={tw`dark:text-white`}>Toggle Dark/Light Mode</Text>
          </TouchableOpacity>
          <TestThree />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Components;
