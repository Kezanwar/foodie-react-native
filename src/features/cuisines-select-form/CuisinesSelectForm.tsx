import { ScrollView, View } from "react-native";
import React, { FC, memo } from "react";
import { ChipContainer, ChipSelect } from "components/chip";

import tw from "theme/tailwind";
import { Fader } from "react-native-ui-lib";
import { SelectChipFormObj } from "types/form";

type Props = {
  onCuisineSelect: (slug: string) => void;
  cuisines: SelectChipFormObj[];
};

const CuisinesSelectForm: FC<Props> = ({ cuisines, onCuisineSelect }) => {
  return (
    <View>
      <ScrollView style={tw`h-[80]`} contentContainerStyle={tw`pb-8`}>
        <ChipContainer>
          {cuisines?.map((item) => (
            <ChipSelect
              slug={item.slug}
              selected={item.selected}
              key={item.slug}
              label={item.name}
              onSelect={onCuisineSelect}
            />
          ))}
        </ChipContainer>
      </ScrollView>
      <Fader visible position={Fader.position.BOTTOM} />
    </View>
  );
};

export default memo(CuisinesSelectForm);
