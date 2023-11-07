import { Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import FilterIcon from "components/svgs/filter-icon";

type Props = {};

const FilterButton: FC<Props> = () => {
  return (
    <TouchableOpacity>
      <FilterIcon />
    </TouchableOpacity>
  );
};

export default FilterButton;
