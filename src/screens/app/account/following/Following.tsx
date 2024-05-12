import { SafeAreaView } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import FollowingRestaurants from "features/following-restaurants";
import { CenteredTextHeader } from "features/headers/common";

const Following: FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <CenteredTextHeader
        title="Following"
        subtitle="Restaurants your are following"
        goBack={navigation.goBack}
      />
      <FollowingRestaurants navigation={navigation} />
    </SafeAreaView>
  );
};

export default Following;
