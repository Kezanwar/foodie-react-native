import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Badge } from "react-native-ui-lib";

import FilterIcon from "components/svgs/filter-icon";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  count: number;
};

const FilterButton: FC<Props> = ({ onPress, count }) => {
  return (
    <TouchableOpacity style={tw`relative`} onPress={onPress}>
      <FilterIcon />
      {count ? (
        <Badge
          size={16}
          backgroundColor={tw.color("success-main")}
          style={tw`absolute right-[-2.5] top-[-2.5] font-light`}
          label={`${count}`}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default FilterButton;
