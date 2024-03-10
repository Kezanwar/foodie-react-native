import { SafeAreaView, Text, View } from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";
import { useAppSelector } from "hooks/useAppSelector";
import tw from "theme/tailwind";
import BackButton from "components/buttons/back-button";
import { Option } from "types/options";
import CategoryFeed from "features/category-feed/CategoryFeed";
import HeaderContainer from "components/header-container";

type Props = any;

type Params = Option;

const Category: FC<Props> = ({ navigation, route }) => {
  const { name, slug } = route.params as Params;
  const location = useAppSelector((state) => state.location.reverseGeocode);

  return (
    <>
      <SafeAreaView style={tw`bg-white`}>
        <HeaderContainer>
          <BackButton withPad={false} onPress={navigation.goBack} />
          <View style={tw` gap-1`}>
            <Typography variant="body2" color="text.secondary">
              Deals tagged in
            </Typography>
            <Typography
              style="font-semi-bold leading-[0] text-4.5"
              variant="h6"
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              near {location?.city}, {location?.subregion}
            </Typography>
          </View>
        </HeaderContainer>
      </SafeAreaView>
      <CategoryFeed navigation={navigation} category={route.params} />
    </>
  );
};

export default Category;
