import React, { FC, useMemo } from "react";

import FilterButton from "components/buttons/filter-button";
import LocationButton from "components/buttons/location-button";
import HeaderContainer from "components/header-container";

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
    <HeaderContainer style="flex-row items-center justify-between">
      <LocationButton onPress={onLocationPress} />
      <FilterButton onPress={onFilterPress} count={filterCount} />
    </HeaderContainer>
  );
};

export default RootHeader;
