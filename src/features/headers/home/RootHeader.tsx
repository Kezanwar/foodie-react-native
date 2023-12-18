import { View } from "react-native";
import React, { FC, useMemo } from "react";
import FilterButton from "components/buttons/filter-button";
import LocationButton from "components/buttons/location-button";
import tw from "theme/tailwind";
import { useAppSelector } from "hooks/useAppSelector";

type Props = { onFilterPress: () => void; onLocationPress: () => void };

const RootHeader: FC<Props> = ({ onFilterPress, onLocationPress }) => {
  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.home.filters
  );

  const filterCount = useMemo(
    () => cuisines.length + dietary_requirements.length,
    [cuisines, dietary_requirements]
  );
  return (
    <View
      style={tw`px-6 border-b-[0.5px] border-b-grey-250 py-3 flex-row items-center justify-between`}
    >
      <LocationButton onPress={onLocationPress} />
      <FilterButton onPress={onFilterPress} count={filterCount} />
    </View>
  );
};

export default RootHeader;
