import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import tw from "theme/tailwind";
import { CustomTextField } from "components/form/custom-text-field";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import Alert from "components/alert/Alert";
import { LoadingButton } from "components/buttons/loading-button";
import TextButton from "components/buttons/text-button";
import { Typography } from "components/typography";
import { AntDesign } from "@expo/vector-icons";
import {
  LocationGeocodedAddress,
  geocodeAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { catchErrorHandler } from "util/error";

const PRIM = tw.color("primary-main");

const AddCustomLocation = (props: any) => {
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LocationGeocodedAddress | null>(null);

  const onGoBack = () => props.navigation.goBack();

  const handleSetSearchText = (value: string) => {
    if (error) setError("");
    setSearchText(value);
  };

  const onSearch = async () => {
    try {
      setLoading(true);
      const res = await geocodeAsync(searchText);
      if (res[0]) {
        const loc = await reverseGeocodeAsync(res[0]);
        setResult(loc[0]);
      } else {
        setError(
          `We couldn't find a location for '${searchText}', please try again.`
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <StaticScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 px-6`}
      >
        <Typography variant="h6" style={" font-semi-bold mb-2 "}>
          Search for a Location
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={"max-w-[70]  mb-12 "}
        >
          Use the input below to set a location to be used for your feed.
        </Typography>
        <View style={tw`flex-row items-center gap-2`}>
          <CustomTextField
            containerStyle={tw`flex-1`}
            value={searchText}
            onChangeText={handleSetSearchText}
            placeholder="Search for a Location"
          />
          {loading ? (
            <ActivityIndicator size={"small"} color={PRIM} />
          ) : (
            <TouchableOpacity onPress={onSearch}>
              <AntDesign name="search1" size={26} color={PRIM} />
            </TouchableOpacity>
          )}
        </View>

        {error && <Alert style="mt-4" variant="error" content={error} />}
        {result && (
          <Typography variant="body2">{JSON.stringify(result)}</Typography>
        )}
        <View style={tw`flex-1 gap-4 justify-end`}>
          <LoadingButton onPress={() => {}} text="Done" />
          <TextButton label="Cancel" onPress={onGoBack} />
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default AddCustomLocation;
