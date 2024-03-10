import { SafeAreaView, Text, View } from "react-native";
import React, { FC } from "react";
import { Image } from "expo-image";
import BackButton from "components/buttons/back-button";
import tw from "theme/tailwind";

type Props = {
  show_cover_photo: boolean;
  cover_photo: string;
  goBack: () => void;
};

const CoverBackButton: FC<Props> = ({
  show_cover_photo,
  cover_photo,
  goBack,
}) => {
  return show_cover_photo ? (
    <View style={tw`w-full relative`}>
      <Image
        transition={500}
        style={tw`h-45 w-full mb-3`}
        source={{ uri: cover_photo }}
      />
      <BackButton isAbsolute={true} onPress={goBack} />
    </View>
  ) : (
    <SafeAreaView>
      <BackButton onPress={goBack} />
    </SafeAreaView>
  );
};

export default CoverBackButton;
