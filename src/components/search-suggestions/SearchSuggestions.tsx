import { Dimensions, View } from "react-native";
import React, { FC } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import tw from "theme/tailwind";
import { useAppSelector } from "hooks/useAppSelector";
import Typography from "components/typography";
import SearchSuggestionButton from "components/buttons/search-suggestion-button";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import useAppDispatch from "hooks/useAppDispatch";
import { handleSuggestionSearch } from "store/discover";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const style = [
  {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  tw`top-[19] px-5 py-2 bg-white z-10`,
];

const SearchSuggestions: FC = () => {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state) => state.discover.searchHistory);
  const location = useAppSelector((state) => state.location.reverseGeocode);

  const onSuggestionPress = (text: string) => {
    dispatch(handleSuggestionSearch(text));
  };

  return (
    <Animated.View style={style} entering={FadeInDown}>
      <KeyboardDismissingView containerStyle={tw`flex-1`} style={tw`flex-1`}>
        <Typography variant="body2" style="mb-4" color="text.secondary">
          Search for deals and restaurants near {location?.city},{" "}
          {location?.subregion}
        </Typography>
        <View style={tw`gap-3`}>
          {searchHistory?.map((text) => {
            return (
              <SearchSuggestionButton
                onPress={onSuggestionPress}
                key={text}
                label={text}
              />
            );
          })}
        </View>
      </KeyboardDismissingView>
    </Animated.View>
  );
};

export default SearchSuggestions;
