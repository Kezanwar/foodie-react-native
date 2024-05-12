import { SafeAreaView } from "react-native";
import React, { FC } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import tw from "theme/tailwind";
import { Option } from "types/options";
import CategoryFeed from "features/category-feed/CategoryFeed";
import { CenteredTextHeader } from "features/headers/common";

type Props = any;

type Params = Option;

const Category: FC<Props> = ({ navigation, route }) => {
  const { name, slug } = route.params as Params;
  const location = useAppSelector((state) => state.location.reverseGeocode);

  return (
    <>
      <SafeAreaView style={tw`bg-white`}>
        <CenteredTextHeader
          title={name}
          subtitle={`near ${location?.city}, ${location?.subregion}`}
          goBack={navigation.goBack}
        />
      </SafeAreaView>
      <CategoryFeed navigation={navigation} category={route.params} />
    </>
  );
};

export default Category;
