import { Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";
import { getAccessToken } from "lib/storage/storage";
import { useFocusEffect } from "@react-navigation/native";

type Props = {};

const Home = (props: Props) => {
  return (
    <ScreenWrapper>
      <Text>Home</Text>
    </ScreenWrapper>
  );
};

export default Home;
