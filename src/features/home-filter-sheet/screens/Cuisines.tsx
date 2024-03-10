import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import tw from "theme/tailwind";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

import { Alphabet } from "../components";
import OptionItem from "../components/OptionItem";
import { TextActionHeader } from "features/headers/common";
import { StaticScreenWrapper } from "components/screen-wrapper";

import { useAppSelector } from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { setCuisineFilterForm } from "store/home/home.slice";
import {
  createAlphabetCuisinesSearchMap,
  findClosestCuisineAlphabetIndex,
} from "./util";
import { AlphabetOptions } from "../constants";

const Cuisines = (props: any) => {
  const dispatch = useAppDispatch();

  const cuisinesFlatListRef = useRef<BottomSheetFlatListMethods>(null);

  const cuisinesForm = useAppSelector(
    (state) => state.home.filterForm.cuisines
  );

  const onItemPress = useCallback((index: number) => {
    dispatch(setCuisineFilterForm(index));
  }, []);

  const alphabetSearchMap = useMemo(() => {
    return cuisinesForm ? createAlphabetCuisinesSearchMap(cuisinesForm) : {};
  }, [cuisinesForm]);

  const onAlphabetClick = useCallback(
    (letter: AlphabetOptions) => {
      const scrollTo = findClosestCuisineAlphabetIndex(
        letter,
        alphabetSearchMap
      );

      if (scrollTo !== null) {
        cuisinesFlatListRef.current?.scrollToIndex({
          index: scrollTo,
          animated: true,
        });
      }
    },
    [alphabetSearchMap]
  );

  return (
    <StaticScreenWrapper>
      <View style={tw`pl-6 pr-4`}>
        <TextActionHeader
          fontSize="medium"
          mb={false}
          headerText="Cuisines"
          rightActionText="Done"
          rightActionOnPress={props.navigation.goBack}
        />
      </View>

      <View style={tw`flex-row h-full`}>
        <BottomSheetFlatList
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              cuisinesFlatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          ref={cuisinesFlatListRef}
          data={cuisinesForm}
          style={tw`px-6`}
          contentContainerStyle={tw`pb-20`}
          keyExtractor={(i) => i.slug}
          renderItem={({ item, index }) => (
            <OptionItem {...item} index={index} onItemPress={onItemPress} />
          )}
        />
        <Alphabet onAlphabetClick={onAlphabetClick} />
      </View>
    </StaticScreenWrapper>
  );
};

export default Cuisines;
