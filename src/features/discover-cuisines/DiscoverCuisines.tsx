import { SafeAreaView, View } from "react-native";
import React, { FC } from "react";
import { Fader } from "react-native-ui-lib";
import tw from "theme/tailwind";
import { ScrollView } from "react-native-gesture-handler";

import { Option } from "types/options";
import ChipButton from "components/buttons/chip-button";
import { ChipContainer } from "components/chip";
import { Typography } from "components/typography";

import { useAppSelector } from "hooks/useAppSelector";

type Props = {
  cuisines?: Option[];
  onCuisinePress: (option: Option) => void;
};

const DiscoverCuisines: FC<Props> = React.memo(
  ({ cuisines, onCuisinePress }) => {
    const location = useAppSelector((state) => state.location.reverseGeocode);

    return !cuisines ? null : (
      <View>
        <View style={tw`mb-5  gap-1`}>
          <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
            Discover Cuisines
          </Typography>
          <Typography variant="body2" color="text.secondary">
            near {location?.city}, {location?.subregion}
          </Typography>
        </View>
        <ChipContainer>
          {cuisines?.map((item) => (
            <ChipButton
              key={item.slug}
              bgColor="grey-200"
              color="text.primary"
              text={item.name}
              onPress={() => onCuisinePress(item)}
            />
          ))}
        </ChipContainer>
      </View>
    );
  }
);

export default DiscoverCuisines;
