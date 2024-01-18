import React, { useEffect } from "react";
import { View } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";

import { FILTER_ROUTES } from "../constants";

import { useAppSelector } from "hooks/useAppSelector";
import useOptionsQuery from "hooks/queries/useOptionsQuery";
import useAppDispatch from "hooks/useAppDispatch";

import {
  clearCuisinesFilter,
  clearDietaryFilter,
  initializeFilterForm,
} from "store/home/home.slice";

import { LoadingScreen } from "components/loading-screen";
import FilterNavAction from "../components/FilterNavAction";

const Root = (props: any) => {
  const dispatch = useAppDispatch();

  const navCuisines = () => props.navigation.navigate(FILTER_ROUTES.CUISINES);
  const navDietary = () =>
    props.navigation.navigate(FILTER_ROUTES.DIETARY_REQUIREMENTS);

  const filterForm = useAppSelector((state) => state.home.filterForm);

  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.home.filterForm
  );

  const { data: opt, isLoading } = useOptionsQuery();

  useEffect(() => {
    if (opt?.data) {
      if (
        !filterForm.cuisines.length ||
        !filterForm.dietary_requirements.length
      ) {
        dispatch(initializeFilterForm(opt?.data));
      }
    }
  }, [
    filterForm.cuisines.length,
    filterForm.dietary_requirements.length,
    opt?.data,
  ]);

  const onClearCuisines = () => {
    dispatch(clearCuisinesFilter());
  };
  const onClearDietarys = () => {
    dispatch(clearDietaryFilter());
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <BottomSheetScrollView style={tw`bg-white `}>
      <View style={tw`px-6 pt-6 gap-6`}>
        <FilterNavAction
          filters={cuisines}
          onClear={onClearCuisines}
          onNav={navCuisines}
          title="Cuisines"
        />

        <FilterNavAction
          filters={dietary_requirements}
          onClear={onClearDietarys}
          onNav={navDietary}
          title="Dietary Requirements"
        />
      </View>
    </BottomSheetScrollView>
  );
};

export default Root;
