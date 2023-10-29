import { Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";
import { clearAccessToken } from "lib/storage/storage";

type Props = {};

const Home = (props: Props) => {
  return (
    <ScreenWrapper>
      <TouchableOpacity onPress={clearAccessToken}>
        <Text>Home</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default Home;
