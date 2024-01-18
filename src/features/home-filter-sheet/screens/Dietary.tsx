import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import tw from "theme/tailwind";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

import OptionItem from "../components/OptionItem";
import { TextActionHeader } from "features/headers/common";
import { StaticScreenWrapper } from "components/screen-wrapper";

import { useAppSelector } from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { setDietaryReqFilterForm } from "store/home/home.slice";

const Dietary = (props: any) => {
  const dispatch = useAppDispatch();

  const dietaryFlatListRef = useRef<BottomSheetFlatListMethods>(null);

  const dietaryForm = useAppSelector(
    (state) => state.home.filterForm.dietary_requirements
  );

  const onItemPress = useCallback((index: number) => {
    dispatch(setDietaryReqFilterForm(index));
  }, []);

  const onDone = () => {
    props.navigation.goBack();
  };

  return (
    <StaticScreenWrapper>
      <View style={tw`pl-6 pr-4`}>
        <TextActionHeader
          fontSize="medium"
          mb={false}
          headerText="Dietary Requirements"
          rightActionText="Done"
          rightActionOnPress={onDone}
        />
      </View>

      <View style={tw`flex-row h-full`}>
        <BottomSheetFlatList
          ref={dietaryFlatListRef}
          data={dietaryForm}
          style={tw`px-6`}
          contentContainerStyle={tw`pb-20`}
          keyExtractor={(i) => i.slug}
          renderItem={({ item, index }) => (
            <OptionItem {...item} index={index} onItemPress={onItemPress} />
          )}
        />
      </View>
    </StaticScreenWrapper>
  );
};

export default Dietary;
