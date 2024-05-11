import { SafeAreaView, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import HeaderContainer from "components/header-container";
import BackButton from "components/buttons/back-button";
import FollowingRestaurants from "features/following-restaurants";

const Following: FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-white `}>
      <HeaderContainer>
        <BackButton withPad={false} onPress={navigation.goBack} />
        <View style={tw` gap-1`}>
          <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
            Following
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Restaurants you are following
          </Typography>
        </View>
      </HeaderContainer>
      <FollowingRestaurants navigation={navigation} />
    </SafeAreaView>
  );
};

export default Following;
